import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import putEmail from '../api/putEmail';

function useEmailEdit(initialEmail?: string) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(initialEmail ?? '');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const isValidEmail = useMemo(() => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }, [email]);

  const helperText = !isValidEmail
    ? '올바른 이메일 형식: name@domain.com'
    : ' ';

  const resetState = () => {
    setEmail(initialEmail ?? '');
    setSubmitting(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      return;
    }
    if (!isValidEmail) {
      return;
    }
    setSubmitting(true);
    try {
      await putEmail(email, status);
      toast.success('이메일이 변경되었습니다.', { toastId: 'unique-toast' });
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('이메일 변경에 실패했습니다.', { toastId: 'unique-toast' });
    }
  };

  return {
    open,
    setOpen,
    email,
    setEmail,
    submitting,
    isValidEmail,
    helperText,
    resetState,
    handleSubmit,
  };
}

export default useEmailEdit;
