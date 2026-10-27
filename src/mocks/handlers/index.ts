/* eslint-disable import/prefer-default-export */
import { adminHandlers } from './admin';
import { authHandlers } from './auth';
import { clubHandlers } from './club';
import { clubMasterHandlers } from './clubMaster';
import { commentHandlers } from './comment';
import { favoriteHandlers } from './favorite';
import { recruitmentHandlers } from './recruitment';
import { storageHandlers } from './storage';
import { universityHandlers } from './university';
import { userHandlers } from './user';

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...universityHandlers,
  ...clubHandlers,
  ...recruitmentHandlers,
  ...commentHandlers,
  ...favoriteHandlers,
  ...clubMasterHandlers,
  ...adminHandlers,
  ...storageHandlers,
];
