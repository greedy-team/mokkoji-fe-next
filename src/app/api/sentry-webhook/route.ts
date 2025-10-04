// app/api/sentry-webhook/route.ts
export const runtime = 'nodejs';

const { DISCORD_WEBHOOK_URL } = process.env;

function ellipsis(s: unknown, max = 300) {
  const str = String(s ?? '');
  return str.length > max ? `${str.slice(0, max - 1)}…` : str;
}

function colorByLevel(level?: string) {
  switch ((level || '').toLowerCase()) {
    case 'fatal':
      return 0x8e44ad; // 보라
    case 'error':
      return 0xe74c3c; // 빨강
    case 'warning':
      return 0xf39c12; // 주황
    case 'info':
      return 0x3498db; // 파랑
    case 'debug':
      return 0x95a5a6; // 회색
    default:
      return 0x2ecc71; // 초록
  }
}

function emojiByLevel(level?: string) {
  switch ((level || '').toLowerCase()) {
    case 'fatal':
      return '🟪';
    case 'error':
      return '🟥';
    case 'warning':
      return '🟧';
    case 'info':
      return '🟦';
    case 'debug':
      return '⬜';
    default:
      return '🟩';
  }
}

function compactDate(d?: string) {
  return d
    ? new Date(d).toISOString().replace('T', ' ').replace('Z', 'Z')
    : undefined;
}

function safeTagList(event: any, limit = 6) {
  const tags: Array<[string, string]> = event?.tags ?? [];
  const arr = Array.isArray(tags) ? tags : Object.entries(tags || {});
  return arr
    .slice(0, limit)
    .map(([k, v]) => `\`${k}:${v}\``)
    .join(' · ');
}

function pickTopFrame(event: any) {
  const entry = (event?.entries || []).find(
    (e: any) => e?.type === 'exception',
  );
  const values = entry?.data?.values || event?.exception?.values || [];
  const ex = values[values.length - 1] || values[0];
  const frames = ex?.stacktrace?.frames || [];
  if (!frames.length) return undefined;

  const frame =
    [...frames].reverse().find((f) => f?.in_app) || frames[frames.length - 1];
  const location = [
    frame?.filename || frame?.abs_path || '?',
    frame?.lineno ?? '?',
  ]
    .filter(Boolean)
    .join(':');
  const func = frame?.function || '(anonymous)';
  return { location, func };
}

async function postToDiscord(payload: any) {
  if (!DISCORD_WEBHOOK_URL) throw new Error('DISCORD_WEBHOOK_URL not set');
  // 개발 환경에서는 전송 안 함
  if (process.env.NODE_ENV === 'development') return;
  const res = await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Discord webhook failed: ${res.status} ${text}`);
  }
}

function extract(body: any) {
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

  const top = pickTopFrame(event);
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
    top,
    tags,
  };
}

export async function POST(req: Request) {
  // 개발환경에서 테스트할 때는 Discord 안 보냄
  if (process.env.NODE_ENV === 'development') {
    return Response.json({ ok: true, message: 'development mode — no send' });
  }

  try {
    const body = await req.json();
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
      top,
      tags,
    } = extract(body);

    const levelEmoji = emojiByLevel(level);

    const title = shortId
      ? `${levelEmoji} [${project}] ${ellipsis(message, 190)} • ${shortId}`
      : `${levelEmoji} [${project}] ${ellipsis(message, 220)}`;

    const lines: string[] = [];
    if (culprit) lines.push(`**Culprit**: \`${ellipsis(culprit, 180)}\``);
    if (top)
      lines.push(
        `**Top Frame**: \`${ellipsis(`${top.location} · ${top.func}`, 220)}\``,
      );
    if (tags) lines.push(`**Tags**: ${ellipsis(tags, 900)}`);
    const description = lines.join('\n');

    const fields = [
      environment && {
        name: 'Environment',
        value: `\`${environment}\``,
        inline: true,
      },
      release && {
        name: 'Release',
        value: `\`${ellipsis(release, 60)}\``,
        inline: true,
      },
      user && {
        name: 'User',
        value: `\`${ellipsis(user, 60)}\``,
        inline: true,
      },
      counts.count && {
        name: 'Events',
        value: `\`${counts.count}\``,
        inline: true,
      },
      counts.users && {
        name: 'Users',
        value: `\`${counts.users}\``,
        inline: true,
      },
      counts.firstSeen && {
        name: 'First Seen',
        value: counts.firstSeen,
        inline: true,
      },
      counts.lastSeen && {
        name: 'Last Seen',
        value: counts.lastSeen,
        inline: true,
      },
      issueUrl && {
        name: 'Issue',
        value: `[Open in Sentry](${issueUrl})`,
        inline: false,
      },
    ].filter(Boolean) as Array<{
      name: string;
      value: string;
      inline?: boolean;
    }>;

    const embed = {
      title,
      url: issueUrl,
      description: ellipsis(description, 3900),
      color: colorByLevel(level),
      timestamp: new Date().toISOString(),
      footer: { text: `Sentry → Discord • ${project}` },
      fields,
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
