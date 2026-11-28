import clientApi from '@/shared/api/client-api';

async function patchAllNotificationsRead(): Promise<void> {
  await clientApi.patch('api/notifications/read-all');
}

export default patchAllNotificationsRead;
