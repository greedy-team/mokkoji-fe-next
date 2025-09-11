// app/api/sentry-webhook/route.ts
// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 안전하게 값 추출 (옵셔널 체이닝)
    const issue = body?.data?.issue;
    const error = body?.data?.event;

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
    } else {
      // 테스트 요청 처리
      title = '✅ Webhook 테스트';
      description = JSON.stringify(body, null, 2);
    }

    // Discord embed 생성 (같음)
    const embed = {
      title,
      url,
      description,
      color: 0x3498db,
      timestamp: new Date().toISOString(),
      footer: { text: 'Sentry → Discord' },
    };

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
