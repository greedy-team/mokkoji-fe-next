// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    role?: string;
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    role?: string;
  }
}
