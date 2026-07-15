'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

type ServerActionResult<TData> = {
  ok: boolean;
  message?: string;
  data?: TData;
};

interface UseServerActionOptions<TData> {
  onSuccess?: (data?: TData, message?: string) => void | Promise<void>;
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
}

export default function useServerAction<TArgs extends unknown[], TData>(
  action: (...args: TArgs) => Promise<ServerActionResult<TData>>,
  options?: UseServerActionOptions<TData>,
) {
  const [isPending, setIsPending] = useState(false);

  const mutate = async (...args: TArgs) => {
    setIsPending(true);
    try {
      const response = await action(...args);
      if (!response.ok) {
        if (options?.showErrorToast !== false) {
          toast.error(response.message);
        }
        return;
      }
      if (options?.showSuccessToast !== false && response.message) {
        toast.success(response.message);
      }
      await options?.onSuccess?.(response.data, response.message);
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending } as const;
}
