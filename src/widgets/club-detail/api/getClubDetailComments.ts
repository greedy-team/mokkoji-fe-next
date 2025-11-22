import api from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import { CommentType } from '../model/type';

interface CommentsResponse {
  comments: CommentType[];
}

export default async function getClubDetailComments(clubId: number) {
  try {
    const response: ApiResponse<CommentsResponse> = await api
      .get(`comments/${clubId}`)
      .json();

    return {
      ok: true,
      data: response.data,
      status: 200,
    };
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}
