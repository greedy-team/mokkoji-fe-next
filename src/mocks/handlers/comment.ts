/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
import dayjs from 'dayjs';
import { http, HttpResponse } from 'msw';
import type { ClubComment } from '@/entities/club-detail/model/type';
import { mockComments, mockUser } from '../data';
import {
  apiUrl,
  errorResponse,
  isAuthorized,
  type MockResponse,
} from '../response';

interface CommentBody {
  content: string;
  rate: number;
}

const notFound = () => errorResponse(404, '댓글을 찾을 수 없습니다.');

export const commentHandlers = [
  http.get<
    { clubId: string },
    never,
    MockResponse<{ comments: ClubComment[] }>
  >(apiUrl('/comments/:clubId'), ({ request, params }) => {
    const comments = mockComments
      .filter((comment) => comment.clubId === Number(params.clubId))
      .map(({ clubId, writerId, ...comment }) => ({
        ...comment,
        isWriter: isAuthorized(request) && writerId === mockUser.id,
      }));
    return HttpResponse.json({ data: { comments } });
  }),

  http.post<
    { clubId: string },
    Partial<CommentBody>,
    MockResponse<{ id: number }>
  >(apiUrl('/comments/:clubId'), async ({ params, request }) => {
    const clubId = Number(params.clubId);
    const hasWritten = mockComments.some(
      (comment) =>
        comment.clubId === clubId && comment.writerId === mockUser.id,
    );
    if (hasWritten) {
      return errorResponse(403, '댓글은 1개만 등록할 수 있습니다.');
    }

    const body = await request.json();
    const id = Math.max(0, ...mockComments.map((comment) => comment.id)) + 1;
    mockComments.unshift({
      id,
      clubId,
      writerId: mockUser.id,
      content: body.content ?? '',
      rate: body.rate ?? 5,
      isModified: false,
      time: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
      isWriter: true,
    });
    return HttpResponse.json({ data: { id } }, { status: 201 });
  }),

  http.patch<
    { commentId: string },
    Partial<CommentBody>,
    MockResponse<{ id: number }>
  >(apiUrl('/comments/:commentId'), async ({ params, request }) => {
    const comment = mockComments.find(
      ({ id }) => id === Number(params.commentId),
    );
    if (!comment) return notFound();

    const body = await request.json();
    comment.content = body.content ?? comment.content;
    comment.rate = body.rate ?? comment.rate;
    comment.isModified = true;
    return HttpResponse.json({ data: { id: comment.id } });
  }),

  http.delete<{ commentId: string }>(
    apiUrl('/comments/:commentId'),
    ({ params }) => {
      const index = mockComments.findIndex(
        ({ id }) => id === Number(params.commentId),
      );
      if (index < 0) return notFound();
      mockComments.splice(index, 1);
      return new HttpResponse(null, { status: 204 });
    },
  ),
];
