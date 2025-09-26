import logger from '@/shared/lib/logger';
import util from 'util';

const originalFetch = global.fetch;

export default function nextLogger() {
  global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const start = Date.now();
    try {
      // 요청 URL
      let url: string;
      if (typeof input === 'string' || input instanceof URL) {
        url = input.toString();
      } else if (input instanceof Request) {
        url = input.url;
      } else {
        url = String(input);
      }

      // 요청 메서드
      let method = 'GET';
      if (typeof input === 'string' || input instanceof URL) {
        method = init?.method ?? 'GET';
      } else if (input instanceof Request) {
        method = input.method;
      }

      // 요청 body (payload)
      let requestPayload: any;
      try {
        if (init?.body) {
          if (typeof init.body === 'string') {
            requestPayload = JSON.parse(init.body);
          } else if (init.body instanceof FormData) {
            requestPayload = {};
            init.body.forEach((value, key) => {
              requestPayload[key] = value;
            });
          } else {
            requestPayload = '[non-text body]';
          }
        } else if (input instanceof Request) {
          const clonedReq = input.clone();
          const text = await clonedReq.text();
          if (text) {
            try {
              requestPayload = JSON.parse(text);
            } catch {
              requestPayload = text;
            }
          }
        }
      } catch {
        requestPayload = '[unreadable request body]';
      }

      const response = await originalFetch(input, init);
      const duration = Date.now() - start;

      const cloned = response.clone();
      let responseBody: any;
      try {
        const buffer = await cloned.arrayBuffer();
        let text = new TextDecoder('utf-8').decode(buffer);
        if (/�/.test(text)) {
          text = new TextDecoder('euc-kr').decode(buffer);
        }

        responseBody = JSON.parse(text);

        const MAX_LEN = 200;
        const bodyStr = JSON.stringify(responseBody);
        if (bodyStr.length > MAX_LEN) {
          responseBody = {
            preview: `${bodyStr.slice(0, MAX_LEN)}…`,
          };
        }
      } catch {
        responseBody = '[unreadable response body]';
      }

      logger.info({
        url,
        method,
        status: response.status,
        duration: `${duration}ms`,
      });

      const debugData: Record<string, unknown> = { response: responseBody };
      if (requestPayload !== undefined) {
        debugData.request = requestPayload;
      }

      logger.debug(
        util.inspect(debugData, {
          depth: Infinity,
          colors: true,
          maxArrayLength: 5,
        }),
      );

      return response;
    } catch (err) {
      logger.error({ input, err });
      throw err;
    }
  };
}
