interface PostReportRequest {
  rating: number;
  content: string;
}

async function postReport({
  rating,
  content,
}: PostReportRequest): Promise<void> {
  const response = await fetch('/api/local/reports', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rating, content }),
  });

  if (!response.ok) {
    throw new Error('피드백 전송에 실패했습니다.');
  }
}

export default postReport;
