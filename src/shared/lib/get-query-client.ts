import 'server-only';
import { cache } from 'react';
import createQueryClient from './query-client';

const getServerQueryClient = cache(() => createQueryClient());

export default getServerQueryClient;
