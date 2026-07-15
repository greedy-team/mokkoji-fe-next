'use client';

import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

interface AsyncBoundaryProps {
  children: ReactNode;
  pendingFallback?: ReactNode;
  rejectedFallback?: ReactNode;
  onReset?: () => void;
  resetKeys?: unknown[];
}

export function AsyncBoundary({
  children,
  pendingFallback,
  rejectedFallback,
  ...errorBoundaryProps
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={(rejectedFallback as React.ReactElement) ?? null}
      {...errorBoundaryProps}
    >
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export function AsyncBoundaryWithQuery(props: AsyncBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();
  return <AsyncBoundary onReset={reset} {...props} />;
}
