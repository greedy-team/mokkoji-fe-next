import { useState, useCallback } from 'react';

/**
 * useDebouncedSubmit
 * @param onSubmit 폼 제출 시 실행할 콜백
 * @param delay 디바운스 시간(ms)
 */
export default function useDebouncedSubmit(
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>,
  delay = 1000,
) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isSubmitting) return; // 이미 제출 중이면 무시
      setIsSubmitting(true);

      try {
        await onSubmit(e); // 원래 submit 로직 실행
      } finally {
        // delay가 끝나야 다시 제출 가능
        setTimeout(() => setIsSubmitting(false), delay);
      }
    },
    [isSubmitting, onSubmit, delay],
  );

  return { handleSubmit, isSubmitting };
}
