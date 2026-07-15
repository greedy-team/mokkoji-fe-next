/* eslint-disable import/prefer-default-export */
import requestByAdmin from '@/shared/lib/admin-request';

export async function GET() {
  return requestByAdmin('admin/me');
}
