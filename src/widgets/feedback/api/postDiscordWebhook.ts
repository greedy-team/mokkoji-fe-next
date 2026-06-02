interface PostDiscordWebhookRequest {
  rating: number;
  comment: string;
}

async function postDiscordWebhook({
  rating,
  comment,
}: PostDiscordWebhookRequest): Promise<void> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_DISCORD_FEEDBACK_WEBHOOK_URL!,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            title: '📋 모꼬지 사용자 피드백',
            color: 0x4ade80,
            fields: [
              {
                name: '⭐ 별점',
                value: '★'.repeat(rating) + '☆'.repeat(5 - rating),
                inline: true,
              },
              {
                name: '💬 의견',
                value: comment || '(내용 없음)',
                inline: false,
              },
            ],
            footer: {
              text: `모꼬지 피드백 • ${new Date().toLocaleString('ko-KR')}`,
            },
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    throw new Error('디스코드 웹훅 전송에 실패했습니다.');
  }
}

export default postDiscordWebhook;
