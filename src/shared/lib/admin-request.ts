import { NextResponse } from 'next/server';
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

  const response = await fetch(url, {
    method: options?.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      ...(options?.body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(options?.body ? { body: JSON.stringify(options.body) } : {}),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export default requestByAdmin;
