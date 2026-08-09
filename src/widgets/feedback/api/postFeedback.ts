import clientApi from '@/shared/api/client-api';

interface PostFeedbackRequest {
  rating: number;
  content: string;
}

async function postFeedback({
  rating,
  content,
}: PostFeedbackRequest): Promise<void> {
  await clientApi.post('api/feedbacks', {
    json: { rating, content },
  });
}

export default postFeedback;
