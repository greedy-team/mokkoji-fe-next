import ky from 'ky';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import getTokenExpiration from './shared/lib/getTokenExpiration';

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
        const response = await ky.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users/auth/login`,
          {
            json: credentials,
          },
        );
        const data = await response.json();
        return data;
      },
    }),
  ],
  callbacks: {
    signIn: async () => {
      return true;
    },
    jwt: async ({ token, account }) => {
      if (account?.provider === 'kakao') {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        };
      }
      if (account?.provider === 'credentials') {
        const expiredTime = getTokenExpiration(account.access_token as string);
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: expiredTime,
        };
      }
      if (Date.now() > (token.expiresAt as number)) {
        return {};
      }
      return token;
    },
    session: async ({ session, token }) => {
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
