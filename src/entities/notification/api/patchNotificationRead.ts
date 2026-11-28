import clientApi from '@/shared/api/client-api';

async function patchNotificationRead(notificationId: number): Promise<void> {
  await clientApi.patch(`api/notifications/${notificationId}/read`);
}

export default patchNotificationRead;
