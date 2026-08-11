import { FormEvent, useMemo, useState } from 'react';
import useServerAction from '@/shared/hooks/useServerAction';
import putEmail from '../../../features/my/api/putEmail';

interface UseEmailEditProps {
  initialEmail?: string;
  isEmailOn: boolean;
}

function useEmailEdit({ initialEmail, isEmailOn }: UseEmailEditProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState(initialEmail ?? '');
  const { mutate, isPending } = useServerAction(putEmail, {
    onSuccess: () => setIsDialogOpen(false),
  });

  const isValidEmail = useMemo(() => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }, [email]);

  const helperText = !isValidEmail
    ? '올바른 이메일 형식: name@domain.com'
    : ' ';

  const resetState = () => {
    setEmail(initialEmail ?? '');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      return;
    }
    if (!isValidEmail) {
      return;
    }
    const isNewEmail = !initialEmail;
    await mutate(email, isNewEmail ? true : isEmailOn);
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    email,
    setEmail,
    isSubmitting: isPending,
    isValidEmail,
    helperText,
    resetState,
    handleSubmit,
  };
}

export default useEmailEdit;
