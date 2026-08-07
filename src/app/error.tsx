'use client';

import ErrorBoundaryFallback, {
  type ErrorBoundaryProps,
} from '@/entities/error/ui/error-boundary-fallback';

export default function RootError({ error }: ErrorBoundaryProps) {
  return <ErrorBoundaryFallback error={error} />;
}
