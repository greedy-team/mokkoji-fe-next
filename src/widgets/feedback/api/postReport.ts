import ky from 'ky';

interface PostReportRequest {
  rating: number;
  content: string;
}

async function postReport({
  rating,
  content,
}: PostReportRequest): Promise<void> {
  await ky.post('/api/local/reports', {
    json: { rating, content },
  });
}

export default postReport;
