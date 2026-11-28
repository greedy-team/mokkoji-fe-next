/* eslint-disable import/prefer-default-export */
import requestByUser from '@/shared/lib/user-request';

export async function PATCH() {
  return requestByUser('notifications/read-all', { method: 'PATCH' });
}
