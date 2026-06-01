'use client';

import ErrorPage from '@/entities/error/ui/error-page';

export default function Error() {
  return <ErrorPage statusCode={500} />;
}
