'use client';

import ErrorPage from '@/entities/error/ui/error-page';

export default function DashboardError() {
  return <ErrorPage statusCode={500} showHomeButton={false} />;
}
