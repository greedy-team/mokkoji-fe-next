'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

import ErrorPage from './error-page';

export interface ErrorBoundaryProps {
  error: Error & { digest?: string };
}

interface ErrorBoundaryFallbackProps extends ErrorBoundaryProps {
  showHomeButton?: boolean;
}

function ErrorBoundaryFallback({
  error,
  showHomeButton,
}: ErrorBoundaryFallbackProps) {
  useEffect(() => {
    // digest가 있으면 서버에서 던져진 예외이고, instrumentation의
    // onRequestError가 전체 스택과 함께 이미 보고했다. 여기서 또 보내면
    // digest만 담긴 중복 이벤트가 쌓인다.
    if (error.digest) return;

    Sentry.captureException(error);
  }, [error]);

  return <ErrorPage statusCode={500} showHomeButton={showHomeButton} />;
}

export default ErrorBoundaryFallback;
