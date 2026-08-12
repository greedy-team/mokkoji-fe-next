import * as Sentry from '@sentry/nextjs';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    integrations: [
      // 세션 리플레이 녹화 시 개인정보가 그대로 찍히지 않도록 전부 가림
      Sentry.replayIntegration({
        maskAllText: true, // 모든 텍스트를 ●●● 형태로 마스킹
        maskAllInputs: true, // 입력값(이메일, 비밀번호 등) 마스킹
        blockAllMedia: true, // 이미지/영상은 녹화에서 제외 (용량 절감 + 유출 방지)
      }),
    ],

    // 에러 직전 사용자 행동(클릭, URL 이동 등) 기록 개수.
    // 재현은 세션 리플레이로 하므로 기본값 100에서 절반으로 줄여 전송량을 아낌
    maxBreadcrumbs: 50,

    // 에러 없는 일반 세션도 1%만 표본으로 녹화.
    // 예외가 안 던져지는 문제(무한 로딩, 이탈 등)를 보기 위한 최소한의 표본
    replaysSessionSampleRate: 0.01,
    // 에러가 발생한 세션은 100% 녹화 (버그 재현용)
    replaysOnErrorSampleRate: 1.0,

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
