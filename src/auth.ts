import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.NEXT_AUTH_SECRET as string,
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_SECRET_KEY as string,
    }),
    // TODO: 추후 로그인 구현
    // CredentialsProvider({
    //   name: 'credentials',
    //   credentials: {
    //     email: { label: '이메일', type: 'text' },
    //     password: { label: '비밀번호', type: 'password' },
    //   },
    //   async authorize(credentials) {
    //     return { id: '1', name: '테스트', email: credentials?.email };
    //   },
    // }),
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
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        accessToken: token.accessToken,
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
