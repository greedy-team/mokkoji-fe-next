import clientApi from '@/shared/api/client-api';

interface PostReportRequest {
  rating: number;
  content: string;
}

async function postReport({
  rating,
  content,
}: PostReportRequest): Promise<void> {
  await clientApi.post('/api/local/reports', {
    json: { rating, content },
  });
}

export default postReport;
