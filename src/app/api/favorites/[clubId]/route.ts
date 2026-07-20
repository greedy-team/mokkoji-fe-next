/* eslint-disable import/prefer-default-export */
import { NextRequest } from 'next/server';
import requestByUser from '@/shared/lib/user-request';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ clubId: string }> },
) {
  const { clubId } = await params;
  return requestByUser(`favorites/${clubId}`, { method: 'POST' });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ clubId: string }> },
) {
  const { clubId } = await params;
  return requestByUser(`favorites/${clubId}`, { method: 'DELETE' });
}
