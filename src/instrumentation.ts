/* eslint-disable import/no-extraneous-dependencies */

const isProd = process.env.NODE_ENV === 'production';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    if (isProd) {
      await import('../sentry.server.config');
    }

    if (!isProd) {
      const { default: nextFetchLogger } = await import('next-fetch-logger');
      nextFetchLogger();
    }
  }

  if (process.env.NEXT_RUNTIME === 'edge' && isProd) {
    await import('../sentry.edge.config');
  }
}

export const onRequestError = isProd
  ? async (
      ...args: Parameters<typeof import('@sentry/nextjs').captureRequestError>
    ) => {
      const Sentry = await import('@sentry/nextjs');
      return Sentry.captureRequestError(...args);
    }
  : undefined;
