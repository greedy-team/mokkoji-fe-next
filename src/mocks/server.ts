/* eslint-disable import/no-extraneous-dependencies */
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

export function startMockServer() {
  server.listen({ onUnhandledRequest: 'bypass' });
}
