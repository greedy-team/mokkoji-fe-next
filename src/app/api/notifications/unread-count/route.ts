/* eslint-disable import/prefer-default-export */
import requestByUser from '@/shared/lib/user-request';

export async function GET() {
  return requestByUser('notifications/unread-count');
}
