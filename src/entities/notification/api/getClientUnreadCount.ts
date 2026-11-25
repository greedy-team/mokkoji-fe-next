import clientApi from '@/shared/api/client-api';
import type { ApiResponse } from '@/shared/model/type';
import type { UnreadCountResponse } from '../model/type';

async function getClientUnreadCount(): Promise<number> {
  const response = await clientApi
    .get('api/notifications/unread-count')
    .json<ApiResponse<UnreadCountResponse>>();

  return response.data?.unreadCount ?? 0;
}

export default getClientUnreadCount;
