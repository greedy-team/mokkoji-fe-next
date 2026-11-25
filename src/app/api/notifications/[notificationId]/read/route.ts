/* eslint-disable import/prefer-default-export */
import requestByUser from '@/shared/lib/user-request';

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ notificationId: string }> },
) {
  const { notificationId } = await params;
  return requestByUser(`notifications/${notificationId}/read`, {
    method: 'PATCH',
  });
}
