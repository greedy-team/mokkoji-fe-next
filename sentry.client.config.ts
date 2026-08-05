import * as Sentry from '@sentry/nextjs';

if (process.env.NEXT_PUBLIC_SENTRY_REPLAY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_REPLAY_DSN,

    integrations: [Sentry.replayIntegration()],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.

    beforeSend(event, hint) {
      const error = hint.originalException;

      // ResizeObserver 루프 경고 - radix-ui 내부에서 발생하는 무해한 브라우저 경고
      if (error?.toString().includes('ResizeObserver')) {
        return null;
      }

      // 크롬 확장 프로그램에서 발생한 에러 - 우리 코드와 무관
      if (
        event.exception?.values?.[0]?.stacktrace?.frames?.some((frame) =>
          frame.filename?.includes('chrome-extension://'),
        )
      ) {
        return null;
      }

      return event;
    },
  });
} else {
  console.log('🧩 Sentry disabled in dev mode');
}
