/* eslint-disable import/no-extraneous-dependencies */
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export async function startMockWorker() {
  await worker.start({ onUnhandledRequest: 'bypass' });
}
