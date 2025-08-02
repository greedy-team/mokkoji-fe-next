import NextAuth, { Account, User, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import getTokenExpiration from './shared/lib/getTokenExpiration';
import serverApi from './shared/api/server-api';
import {
  LoginSuccessResponse,
  RoleResponse,
} from './features/login/model/type';

export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET as string,
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_SECRET_KEY as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        studentId: { label: '학번', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await serverApi.post('users/auth/login', {
            json: credentials,
          });
          const data: LoginSuccessResponse = await response.json();
          return {
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
          };
        } catch (error) {
          console.error('[authorize error]', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({
      token,
      account,
      user,
    }: {
      token: JWT;
      account?: Account | null;
      user?: User | null;
    }) => {
      if (account?.provider === 'kakao') {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        };
      }
      if (user && account?.provider === 'credentials') {
        const expiredTime = getTokenExpiration(user.accessToken as string);

        try {
          const headers = {
            Authorization: `Bearer ${user.accessToken}`,
          };
          const rolesRes = await serverApi.get('users/roles', { headers });
          const rolesData: RoleResponse = await rolesRes.json();

          return {
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            expiresAt: expiredTime,
            role: rolesData.data.role,
          };
        } catch (error) {
          console.error('[role fetch error]', error);
          return {
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            expiresAt: expiredTime,
          };
        }
      }
      if (Date.now() > (token.expiresAt as number)) {
        console.warn('accessToken expired, no refresh logic');
        return {};
      }
      return token;
    },
    session: async ({
      session,
      token,
    }: {
      session: Session;
      token: JWT & { role?: string };
    }) => {
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expiresAt: token.expiresAt,
        role: token.role,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
    redirect: async ({ url, baseUrl }: { url: string; baseUrl: string }) => {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (url) {
        const { search, origin } = new URL(url);
        const callbackUrl = new URLSearchParams(search).get('callbackUrl');
        if (callbackUrl)
          return callbackUrl.startsWith('/')
            ? `${baseUrl}${callbackUrl}`
            : callbackUrl;
        if (origin === baseUrl) return url;
      }
      return baseUrl;
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
