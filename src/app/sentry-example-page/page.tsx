'use client';

import Head from 'next/head';
import * as Sentry from '@sentry/nextjs';
import { useState, useEffect } from 'react';

class SentryExampleFrontendError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = 'SentryExampleFrontendError';
  }
}

export default function Page() {
  const [hasSentError, setHasSentError] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    async function checkConnectivity() {
      const result = await Sentry.diagnoseSdkConnectivity();
      setIsConnected(result !== 'sentry-unreachable');
    }
    checkConnectivity();
  }, []);

  const renderStatus = () => {
    if (hasSentError) {
      return <p className="success">Error sent to Sentry.</p>;
    }

    if (!isConnected) {
      return (
        <div className="connectivity-error">
          <p>
            It looks like network requests to Sentry are being blocked, which
            will prevent errors from being captured. Try disabling your
            ad-blocker to complete the test.
          </p>
        </div>
      );
    }

    return <div className="success_placeholder" />;
  };

  return (
    <div>
      <Head>
        <title>sentry-example-page</title>
        <meta name="description" content="Test Sentry for your Next.js app!" />
      </Head>

      <main>
        <div className="flex-spacer" />
        <svg
          height="40"
          width="40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG path 생략 */}
        </svg>
        <h1>sentry-example-page</h1>

        <p className="description">
          Click the button below, and view the sample error on the Sentry{' '}
          <a
            target="_blank"
            href="https://sejong-univ-hv.sentry.io/issues/?project=4509604420452352"
          >
            Issues Page
          </a>
          . For more details about setting up Sentry,{' '}
          <a
            target="_blank"
            href="https://docs.sentry.io/platforms/javascript/guides/nextjs/"
          >
            read our docs
          </a>
          .
        </p>

        <button
          type="button"
          onClick={async () => {
            await Sentry.startSpan(
              {
                name: 'Example Frontend/Backend Span',
                op: 'test',
              },
              async () => {
                const res = await fetch('/api/sentry-example-api');
                if (!res.ok) {
                  setHasSentError(true);
                }
              },
            );
            throw new SentryExampleFrontendError(
              'This error is raised on the frontend of the example page.',
            );
          }}
          disabled={!isConnected}
        >
          <span>Throw Sample Error</span>
        </button>

        {renderStatus()}

        <div className="flex-spacer" />
      </main>

      <style>{`
        /* 스타일은 기존 코드와 동일하므로 생략 가능 */
      `}</style>
    </div>
  );
}
