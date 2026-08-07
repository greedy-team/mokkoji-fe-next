// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // 세션 리플레이는 브라우저 DOM을 녹화하는 기능이라 엣지에도 넣지 않음.
    // replayIntegration은 sentry.client.config.ts에만 등록되어 있음

    // 요청 10개 중 1개만 성능 데이터 전송 (Sentry 전송량 절감)
    tracesSampleRate: 0.1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
} else {
  console.log('🧩 Sentry disabled in dev mode');
}
