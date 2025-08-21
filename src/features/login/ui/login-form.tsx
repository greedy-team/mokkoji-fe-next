'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Input from '@/shared/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import DotsPulseLoader from '@/shared/ui/DotsPulseLoader';

function LoginForm({ confirmed }: { confirmed: boolean }) {
  const router = useRouter();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<{
    studentId?: string;
    password?: string;
  }>({});

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    const result: any = await signIn('credentials', {
      redirect: false,
      studentId,
      password,
    });
    setIsSubmitting(false);
    if (result?.error) {
      toast.error('학번 또는 비밀번호를 확인해주세요.', {
        toastId: 'unique-toast',
      });
      return;
    }

    router.refresh();
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
          type={showPassword ? 'text' : 'password'}
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
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
          aria-label="비밀번호 보기 토글"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {isSubmitting ? (
        <div className="flex h-10 w-full items-center justify-center">
          <DotsPulseLoader className="mr-3" text="로그인 중..." />
        </div>
      ) : (
        <>
          <Button
            type="submit"
            disabled={studentId === '' || password === '' || !confirmed}
            className="mt-5 h-10 w-full gap-2 bg-black font-medium text-white"
          >
            확인
          </Button>
          {!confirmed && (
            <p className="text-xs text-[#FF383C]">
              *로그인 안내를 확인해주세요.
            </p>
          )}
        </>
      )}
    </form>
  );
}

export default LoginForm;
