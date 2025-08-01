'use server';

import { signIn } from '@/auth';

export default async function loginAction({
  studentId,
  password,
}: {
  studentId: string;
  password: string;
}) {
  try {
    await signIn('credentials', {
      redirect: true,
      studentId,
      password,
    });
    return { success: true };
  } catch (e) {
    return { success: false, message: '아이디 비밀번호를 확인해주세요.' };
  }
}
