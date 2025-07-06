/**
 * Sentry를 사용하지 않는 환경에서 사용할 더미 mock 함수
 */

const init = () => {
  console.log(
    '\x1b[33m%s\x1b[0m',
    '⚠️  Sentry is disabled - Using mock functions',
  );
};

const captureException = (error: Error) => {};
const captureRequestError = (error: Error) => {};
const captureRouterTransitionStart = () => {};
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return children;
}

export {
  init,
  captureException,
  captureRequestError,
  captureRouterTransitionStart,
  ErrorBoundary,
};
