import * as Sentry from '@sentry/nextjs';
import nextLogger from '@/shared/lib/nextLogger';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
    if (process.env.NODE_ENV === 'development') {
      nextLogger();
    }
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
