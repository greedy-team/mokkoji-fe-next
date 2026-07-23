/* eslint-disable import/prefer-default-export */
import { adminHandlers } from './admin';
import { clubMasterHandlers } from './clubMaster';
import { universityHandlers } from './university';

export const handlers = [
  ...adminHandlers,
  ...clubMasterHandlers,
  ...universityHandlers,
];
