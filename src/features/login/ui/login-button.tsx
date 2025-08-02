'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Input from '@/shared/ui/input';
import { Eye, EyeOff } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const result: any = await signIn('credentials', {
      redirect: false,
      studentId,
      password,
    });

    if (result?.error) {
      toast.dismiss();
      toast.error('학번 또는 비밀번호를 확인해주세요.');
      return;
    }
    router.push('/');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex w-full flex-col space-y-2"
    >
      <label htmlFor="studentId" className="font-medium">
        학번
      </label>
      <Input
        type="text"
        placeholder="학번"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="w-full rounded border px-3 py-2"
      />

      <label htmlFor="password" className="font-medium">
        비밀번호
      </label>
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

      <Button
        type="submit"
        disabled={studentId === '' || password === ''}
        className="mt-5 h-10 w-full bg-black font-medium text-white"
      >
        확인
      </Button>
    </form>
  );
}

export default LoginForm;
