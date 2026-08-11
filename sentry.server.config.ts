// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // 세션 리플레이는 브라우저 DOM을 녹화하는 기능이라 서버에는 넣지 않음.
    // replayIntegration은 sentry.client.config.ts에만 등록되어 있음

    // 요청 10개 중 1개만 성능 데이터 전송 (Sentry 전송량 절감)
    tracesSampleRate: 0.1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
} else {
  console.log('🧩 Sentry disabled in dev mode');
}
