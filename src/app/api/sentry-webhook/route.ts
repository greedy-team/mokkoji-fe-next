// app/api/sentry-webhook/route.ts
export const runtime = 'nodejs';

const { DISCORD_WEBHOOK_URL } = process.env;

const recentAlertCache = new Map<string, number>();
const DUPLICATE_INTERVAL = 5 * 60 * 1000; // 5분

/** 🔹 긴 문자열 줄이기 */
function ellipsis(text: unknown, maxLength = 300) {
  const str = String(text ?? '');
  return str.length > maxLength ? `${str.slice(0, maxLength - 1)}…` : str;
}

/** 🔹 레벨별 색상/이모지 */
const colorByLevel = (level?: string) =>
  ({
    fatal: 0x8e44ad,
    error: 0xe74c3c,
    warning: 0xf39c12,
    info: 0x3498db,
    debug: 0x95a5a6,
    default: 0x2ecc71,
  })[level?.toLowerCase() || 'default'];

const emojiByLevel = (level?: string) =>
  ({
    fatal: '🟪',
    error: '🟥',
    warning: '🟧',
    info: '🟦',
    debug: '⬜',
    default: '🟩',
  })[level?.toLowerCase() || 'default'];

function compactDate(dateString?: string) {
  return dateString
    ? new Date(dateString).toISOString().replace('T', ' ').replace('Z', 'Z')
    : undefined;
}

function safeTagList(event: any, limit = 6) {
  const tags: Array<[string, string]> = event?.tags ?? [];
  const tagEntries = Array.isArray(tags) ? tags : Object.entries(tags || {});
  return tagEntries
    .slice(0, limit)
    .map(([tagKey, tagValue]) => `\`${tagKey}:${tagValue}\``)
    .join(' · ');
}

function pickTopFrame(event: any) {
  const exceptionEntry = (event?.entries || []).find(
    (entry: any) => entry?.type === 'exception',
  );
  const values = exceptionEntry?.data?.values || event?.exception?.values || [];
  const exception = values[values.length - 1] || values[0];
  const frames = exception?.stacktrace?.frames || [];
  if (!frames.length) return undefined;

  const topFrame =
    [...frames].reverse().find((f) => f?.in_app) || frames[frames.length - 1];
  const location = [
    topFrame?.filename || topFrame?.abs_path || '?',
    topFrame?.lineno ?? '?',
  ]
    .filter(Boolean)
    .join(':');
  const func = topFrame?.function || '(anonymous)';
  return { location, func };
}

async function postToDiscord(payload: any) {
  if (!DISCORD_WEBHOOK_URL) throw new Error('DISCORD_WEBHOOK_URL not set');
  if (process.env.NODE_ENV === 'development') return;

  const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  console.log(DISCORD_WEBHOOK_URL, '전송됨!!!');
  if (!discordResponse.ok) {
    const errorText = await discordResponse.text().catch(() => '');
    console.error('❌ Discord 전송 실패:', discordResponse.status, errorText);
  }
}

function extractSentryAlertData(body: any) {
  const issue = body?.data?.issue ?? body?.issue;
  const event = body?.data?.event ?? body?.event;

  const project =
    issue?.project?.name ?? event?.project ?? body?.project ?? 'Unknown';
  const level = (event?.level ?? issue?.level ?? 'error').toLowerCase();
  const environment =
    event?.environment ??
    issue?.environment ??
    body?.data?.environment ??
    'unknown';

  const release =
    event?.release ??
    event?.contexts?.app?.version ??
    issue?.firstRelease?.version ??
    undefined;

  const user =
    event?.user?.email || event?.user?.username || event?.user?.id || undefined;

  const shortId = issue?.shortId ?? undefined;
  const issueUrl = issue?.url ?? body?.url ?? undefined;
  const culprit = event?.culprit ?? issue?.culprit ?? undefined;
  const message = event?.message ?? issue?.title ?? 'Unknown error';

  const counts = {
    count: issue?.count ? String(issue.count) : undefined,
    users: issue?.userCount ? String(issue.userCount) : undefined,
    firstSeen: compactDate(issue?.firstSeen),
    lastSeen: compactDate(issue?.lastSeen),
  };

  const topStackFrame = pickTopFrame(event);
  const tags = safeTagList(event, 8);

  return {
    project,
    level,
    environment,
    release,
    user,
    shortId,
    issueUrl,
    culprit,
    message,
    counts,
    topStackFrame,
    tags,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;
    const issueId = String(body?.data?.issue?.id ?? 'unknown');

    // 허용 액션 필터링
    const allowedActions = ['created'];
    if (!allowedActions.includes(action)) {
      return Response.json({ ok: true, skip: `ignored action=${action}` });
    }

    // 중복 방지
    const now = Date.now();
    const last = recentAlertCache.get(issueId);
    if (last && now - last < DUPLICATE_INTERVAL) {
      return Response.json({ ok: true, skip: 'duplicate alert' });
    }
    recentAlertCache.set(issueId, now);

    // ✅ 3️⃣ 데이터 추출 및 Discord 전송
    const {
      project,
      level,
      environment,
      release,
      user,
      shortId,
      issueUrl,
      culprit,
      message,
      counts,
      topStackFrame,
      tags,
    } = extractSentryAlertData(body);

    const levelEmoji = emojiByLevel(level);
    const title = shortId
      ? `${levelEmoji} [${project}] ${ellipsis(message, 190)} • ${shortId}`
      : `${levelEmoji} [${project}] ${ellipsis(message, 220)}`;

    const lines: string[] = [];
    if (culprit) lines.push(`**Culprit**: \`${ellipsis(culprit, 180)}\``);
    if (topStackFrame)
      lines.push(
        `**Top Frame**: \`${ellipsis(`${topStackFrame.location} · ${topStackFrame.func}`, 220)}\``,
      );
    if (tags) lines.push(`**Tags**: ${ellipsis(tags, 900)}`);

    const embed = {
      title,
      url: issueUrl,
      description: ellipsis(lines.join('\n'), 3900),
      color: colorByLevel(level),
      timestamp: new Date().toISOString(),
      footer: { text: `Sentry → Discord • ${project}` },
      fields: [
        environment && { name: 'Environment', value: `\`${environment}\`` },
        release && { name: 'Release', value: `\`${release}\`` },
        user && { name: 'User', value: `\`${user}\`` },
        counts.count && { name: 'Events', value: `\`${counts.count}\`` },
        counts.users && { name: 'Users', value: `\`${counts.users}\`` },
        counts.lastSeen && { name: 'Last Seen', value: counts.lastSeen },
        issueUrl && {
          name: 'Issue',
          value: `[Open in Sentry](${issueUrl})`,
          inline: false,
        },
      ].filter(Boolean),
      author: {
        name: 'Sentry Alert',
        url: issueUrl,
        icon_url:
          'https://raw.githubusercontent.com/getsentry/sentry-docs/main/src/images/favicon.png',
      },
    };

    await postToDiscord({ username: 'Sentry Bot', embeds: [embed] });
    return Response.json({ ok: true });
  } catch (err) {
    console.error('❌ Sentry Webhook 처리 실패:', err);
    return new Response('fail', { status: 500 });
  }
}
