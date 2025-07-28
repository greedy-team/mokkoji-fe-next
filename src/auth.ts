import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import CredentialsProvider from 'next-auth/providers/credentials';

// NextAuth 설정
export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.NEXT_AUTH_SECRET!,
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: '이메일', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        return { id: '1', name: '테스트', email: credentials?.email };
      },
    }),
  ],
  callbacks: {
    signIn: async () => {
      return true;
    },
    jwt: async ({ token, user }) => {
      return token;
    },
    session: async ({ session, token }) => {
      return session;
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
