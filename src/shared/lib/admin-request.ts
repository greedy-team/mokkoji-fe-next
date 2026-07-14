import { NextResponse } from 'next/server';
import ky from 'ky';
import { getDashboardSession } from '@/shared/lib/dashboard-session';

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

interface RequestByAdminOptions {
  searchParams?: URLSearchParams;
  method?: string;
  body?: unknown;
}

async function requestByAdmin(
  pathname: string,
  options?: RequestByAdminOptions,
) {
  const session = await getDashboardSession();
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(`${API_BASE}/${pathname}`);
  options?.searchParams?.forEach((value, key) =>
    url.searchParams.set(key, value),
  );

  const response = await ky(url, {
    method: options?.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    json: options?.body ?? undefined,
    throwHttpErrors: false,
  });

  const text = await response.text();
  if (!text) {
    return new NextResponse(null, { status: response.status });
  }

  return NextResponse.json(JSON.parse(text), { status: response.status });
}

export default requestByAdmin;
