/* eslint-disable import/prefer-default-export */
import { NextRequest } from 'next/server';
import requestByAdmin from '@/shared/lib/admin-request';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ clubId: string }> },
) {
  const { clubId } = await params;
  return requestByAdmin(`admin/clubs/${clubId}`, { method: 'DELETE' });
}
