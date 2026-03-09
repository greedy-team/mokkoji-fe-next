'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Input from '@/shared/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import DotsPulseLoader from '@/shared/ui/DotsPulseLoader';
import { useLoginModal } from '@/shared/lib/login-modal-context';
import { useSession } from '@/shared/lib/session-context';

interface LoginFormProps {
  isTermsConfirmed: boolean;
  onTermsModalOpen: (confirmed: boolean) => void;
}

function LoginForm({ isTermsConfirmed, onTermsModalOpen }: LoginFormProps) {
  const router = useRouter();
  const { closeLoginModal } = useLoginModal();
  const { refresh: refreshSession } = useSession();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<{
    studentId?: string;
    password?: string;
  }>({});

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    // FormData에서 직접 값을 읽어옴 (state 동기화 문제 방지)
    const formData = e ? new FormData(e.currentTarget) : null;
    const currentStudentId =
      formData?.get('studentId')?.toString() || studentId;
    const currentPassword = formData?.get('password')?.toString() || password;

    // 빈 값이면 submit 막기
    if (currentStudentId === '' || currentPassword === '') {
      return;
    }

    if (!isTermsConfirmed) {
      onTermsModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: currentStudentId,
          password: currentPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast.error('학번 또는 비밀번호를 확인해주세요.');
        return;
      }
      closeLoginModal();
      refreshSession();
      router.refresh();
    } catch {
      toast.error('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBlur = (field: 'studentId' | 'password', value: string) => {
    if (value.trim() === '') {
      setErrors((prev) => ({
        ...prev,
        [field]: `${field === 'studentId' ? '학번을' : '비밀번호를'} 입력해주세요!`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex h-[430px] w-full flex-col space-y-2"
    >
      <label
        htmlFor="studentId"
        className="flex flex-row gap-2 text-xs font-medium"
      >
        학번
        {errors.studentId && (
          <p className="text-[#FF383C]">*{errors.studentId}</p>
        )}
      </label>
      <Input
        name="studentId"
        type="text"
        placeholder="학번"
        value={studentId}
        onChange={(e) => {
          setStudentId(e.target.value);
          if (errors.studentId)
            setErrors((prev) => ({
              ...prev,
              studentId,
            }));
        }}
        onBlur={() => handleBlur('studentId', studentId)}
        className="w-full rounded border px-3 py-2"
      />

      <label
        htmlFor="password"
        className="flex flex-row gap-2 text-xs font-medium"
      >
        비밀번호
        {errors.password && (
          <p className="text-[#FF383C]">*{errors.password}</p>
        )}
      </label>
      <div className="relative">
        <Input
          name="password"
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password)
              setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          onBlur={() => handleBlur('password', password)}
          className="w-full rounded border px-3 py-2 pr-10"
        />
        <button
          type="button"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
          className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
          aria-label="비밀번호 보기 토글"
        >
          {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {isSubmitting ? (
        <div className="flex h-10 w-full items-center justify-center">
          <DotsPulseLoader className="mr-3" text="로그인 중..." />
        </div>
      ) : (
        <Button
          type="submit"
          disabled={studentId === '' || password === ''}
          className="mt-5 h-10 w-full gap-2 bg-black font-medium text-white disabled:bg-[#D9D9D9] disabled:text-[#9C9C9C]"
        >
          확인
        </Button>
      )}
    </form>
  );
}

export default LoginForm;
