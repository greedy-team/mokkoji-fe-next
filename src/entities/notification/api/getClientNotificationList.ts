import clientApi from '@/shared/api/client-api';
import type { ApiResponse } from '@/shared/model/type';
import type { NotificationsResponse } from '../model/type';

async function getClientNotificationList(params: {
  page: number;
  size: number;
}): Promise<NotificationsResponse> {
  const response = await clientApi
    .get('api/notifications', {
      searchParams: { page: params.page, size: params.size },
    })
    .json<ApiResponse<NotificationsResponse>>();

  return (
    response.data ?? {
      notifications: [],
      pagination: {
        page: params.page,
        size: params.size,
        totalPages: 0,
        totalElements: 0,
      },
    }
  );
}

export default getClientNotificationList;
