import { QueryClient, type DefaultOptions } from '@tanstack/react-query';

function createQueryClient(defaultOptions?: DefaultOptions) {
  return new QueryClient({ defaultOptions });
}

export default createQueryClient;
