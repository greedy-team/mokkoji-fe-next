// app/api/sentry-webhook/route.ts
// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Sentry payload에서 필요한 정보 추출
    const issue = body.data?.issue;
    const error = body.data?.event;

    let title = '🚨 Sentry Alert';
    let description = '알 수 없는 이벤트';
    let url = '';
    let project = 'Unknown';
    let level = 'error';

    if (issue) {
      title = `🚨 [${issue.project?.name}] ${issue.title}`;
      description = issue.culprit ?? '이슈 발생';
      url = issue.url ?? '';
      project = issue.project?.name ?? 'Unknown';
      level = issue.level ?? 'error';
    } else if (error) {
      title = `🚨 Error: ${error.message}`;
      description = error.culprit ?? '에러 발생';
      url = error.url ?? '';
      project = error.project ?? 'Unknown';
      level = error.level ?? 'error';
    }

    // 색상 매핑 (Discord embed color는 10진수 RGB)
    const levelColors: Record<string, number> = {
      fatal: 0xff0000,
      error: 0xe74c3c,
      warning: 0xf39c12,
      info: 0x3498db,
      debug: 0x95a5a6,
    };

    const embed = {
      title,
      url,
      description,
      color: levelColors[level] ?? 0xe74c3c,
      fields: [
        {
          name: '프로젝트',
          value: project,
          inline: true,
        },
        {
          name: '레벨',
          value: level,
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Sentry → Discord',
      },
    };

    // Discord Webhook 전송
    await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('❌ Sentry Webhook 처리 실패:', err);
    return new Response('fail', { status: 500 });
  }
}
