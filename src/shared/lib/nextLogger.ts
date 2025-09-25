import logger from '@/shared/lib/logger';

const originalFetch = global.fetch;

export default function nextLogger() {
  global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const start = Date.now();
    try {
      const response = await originalFetch(input, init);
      const duration = Date.now() - start;

      let url: string;
      if (typeof input === 'string' || input instanceof URL) {
        url = input.toString();
      } else if (input instanceof Request) {
        url = input.url;
      } else {
        url = String(input);
      }

      let method = 'GET';
      if (typeof input === 'string' || input instanceof URL) {
        method = init?.method ?? 'GET';
      } else if (input instanceof Request) {
        method = input.method;
      }

      const cloned = response.clone();
      let body;
      try {
        const buffer = await cloned.arrayBuffer();
        let text = new TextDecoder('utf-8').decode(buffer);
        if (/�/.test(text)) {
          text = new TextDecoder('euc-kr').decode(buffer);
        }

        body = JSON.parse(text);

        const MAX_LEN = 200;
        const bodyStr = JSON.stringify(body);
        if (bodyStr.length > MAX_LEN) {
          body = JSON.parse(
            JSON.stringify({
              preview: `${bodyStr.slice(0, MAX_LEN)}…`,
              truncated: true,
            }),
          );
        }
      } catch {
        body = '[unreadable body]';
      }

      logger.info({
        url,
        method,
        status: response.status,
        duration: `${duration}ms`,
      });
      logger.debug(body);

      return response;
    } catch (err) {
      logger.error({ input, err });
      throw err;
    }
  };
}
