/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { getSession } from '@/shared/lib/cookie-session';

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

// 브라우저 EventSource는 Authorization 헤더를 붙일 수 없어 Next가 토큰을 달고 대신 연결한다.
// requestByUser는 response.text()로 본문을 모두 읽어 스트림이 끝나야 응답하므로 쓸 수 없다.
export async function GET(request: Request) {
  const session = await getSession();
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${API_BASE}/notifications/subscribe`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: 'text/event-stream',
      },
      signal: request.signal,
      cache: 'no-store',
    });
  } catch {
    return NextResponse.json(
      { error: 'Notification stream unavailable' },
      { status: 502 },
    );
  }

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: 'Notification stream unavailable' },
      { status: upstream.status === 200 ? 502 : upstream.status },
    );
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      // nginx가 버퍼링하면 이벤트가 에러 없이 지연된다
      'X-Accel-Buffering': 'no',
    },
  });
}
