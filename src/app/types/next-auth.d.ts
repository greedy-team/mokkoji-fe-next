// types/next-auth.d.ts
import NextAuth from 'next-auth';
import { UserInfoType } from '@/entities/my/model/type';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    user?: UserInfoType;
    role?: string;
    manageClubInfo?: ManageClub[];
  }

  interface User {
    role?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    user?: UserInfoType;
    manageClubInfo?: ManageClub[];
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
}
