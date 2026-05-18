/* eslint-disable import/prefer-default-export */
import { adminHandlers } from './admin';
import { clubMasterHandlers } from './clubMaster';

export const handlers = [...adminHandlers, ...clubMasterHandlers];
