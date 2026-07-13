'use client';

import { useState } from 'react';
import {
  QueryClientProvider,
  type DefaultOptions,
} from '@tanstack/react-query';
import createQueryClient from './query-client';

interface QueryProviderProps {
  children: React.ReactNode;
  defaultOptions?: DefaultOptions;
}

function QueryProvider({ children, defaultOptions }: QueryProviderProps) {
  const [queryClient] = useState(() => createQueryClient(defaultOptions));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
