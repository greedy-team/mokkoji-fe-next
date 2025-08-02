import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import getTokenExpiration from './shared/lib/getTokenExpiration';
import serverApi from './shared/api/server-api';
import { LoginSuccessResponse } from './features/login/model/type';

export const { auth, handlers, signIn, signOut } = NextAuth({
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
      async authorize(credentials): Promise<any> {
        try {
          const response = await serverApi.post('users/auth/login', {
            json: credentials,
          });
          const data: LoginSuccessResponse = await response.json();
          console.log('request', data.data);
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
    jwt: async ({ token, account, user }) => {
      // 소셜 로그인
      if (account?.provider === 'kakao') {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        };
      }

      if (user && account?.provider === 'credentials') {
        const expiredTime = getTokenExpiration(user.accessToken as string);
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: expiredTime,
        };
      }

      // accessToken 만료 체크
      if (Date.now() > (token.expiresAt as number)) {
        console.warn('accessToken expired, but no refresh logic yet');
        return {};
      }

      return token;
    },
    session: async ({ session, token }) => {
      console.log('token', token);
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expiresAt: token.expiresAt,
      };
    },
    redirect: async ({ url, baseUrl }) => {
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
});
