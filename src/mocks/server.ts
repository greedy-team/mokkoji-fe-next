/* eslint-disable import/no-extraneous-dependencies */
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

export function startMockServer() {
  server.listen({ onUnhandledRequest: 'bypass' });

  // MSW는 fetch를 writable 없이 defineProperty로 교체해서, 이후 Next가 globalThis.fetch에
  // 자기 패치를 대입할 때 TypeError가 난다. Next는 현재 fetch(MSW 프록시)를 감싸므로 가로채기는 유지된다
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'fetch');
  if (descriptor && !descriptor.writable && !descriptor.get) {
    Object.defineProperty(globalThis, 'fetch', {
      ...descriptor,
      writable: true,
    });
  }
}
