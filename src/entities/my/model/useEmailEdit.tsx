import { FormEvent, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import putEmail from '../api/putEmail';

function useEmailEdit(initialEmail?: string) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(initialEmail ?? '');
  const [submitting, setSubmitting] = useState(false);

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
    const response = await putEmail(email);
    if (!response.ok) {
      toast.error(response.message);
      return;
    }
    toast.success(response.message);
    setOpen(false);

    setSubmitting(false);
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
