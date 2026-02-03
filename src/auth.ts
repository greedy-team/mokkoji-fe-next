import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import KakaoProvider from 'next-auth/providers/kakao';
import getTokenExpiration from './shared/lib/getTokenExpiration';
import serverApi from './shared/api/server-api';
import {
  LoginSuccessResponse,
  RoleResponse,
} from './features/login/model/type';
import UserInfoType from './entities/my/model/type';

// TODO: 추후 루시아로 변경
export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60 * 24 * 3,
  },
  trustHost: true,
  pages: {
    error: '/login?callbackUrl=/',
  },
  providers: [
    // KakaoProvider({
    //   clientId: process.env.KAKAO_CLIENT_ID as string,
    //   clientSecret: process.env.KAKAO_SECRET_KEY as string,
    // }),
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
          if (!data.data) {
            return null;
          }
          const userResponse = await serverApi.get('users', {
            headers: {
              Authorization: `Bearer ${data.data.accessToken}`,
            },
          });
          const userData: { data: { user: UserInfoType } } =
            await userResponse.json();
          return {
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
            user: userData.data.user,
          };
        } catch (error) {
          console.error(
            '[authorize error]',
            error instanceof Error ? error.message : 'Unknown error',
          );
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      // 소셜 로그인 (현재 미사용)
      // if (account?.provider === 'kakao') {
      //   return {
      //     ...token,
      //     accessToken: account.access_token,
      //     refreshToken: account.refresh_token,
      //   };
      // }

      if (user && account?.provider === 'credentials') {
        const expiredTime = getTokenExpiration(user.accessToken as string);

        try {
          if (!user.accessToken) {
            return {
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
              expiresAt: expiredTime,
              user: user.user,
            };
          }
          const headers = {
            Authorization: `Bearer ${user.accessToken}`,
          };
          const rolesRes = await serverApi.get('users/roles', { headers });
          const rolesData: RoleResponse = await rolesRes.json();
          if (!rolesData.data) {
            return {
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
              expiresAt: expiredTime,
              user: user.user,
            };
          }
          return {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            expiresAt: expiredTime,
            user: user.user,
            role: rolesData.data.role,
          };
        } catch (error) {
          console.error(
            '[role fetch error]',
            error instanceof Error ? error.message : 'Unknown error',
          );
          return {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            expiresAt: expiredTime,
            user: user.user,
          };
        }
      }

      // 이미 에러가 있으면 리프레시 시도 스킵 (무한루프 방지)
      if (token.error) {
        return token;
      }

      // expiresAt이 없거나 만료 59분 전이면 리프레시 시도 (테스트용)
      if (
        token.expiresAt &&
        Date.now() > (token.expiresAt as number) - 59 * 60 * 1000
      ) {
        try {
          const response = await serverApi.post('users/auth/refresh', {
            headers: {
              Authorization: `Bearer ${token.refreshToken}`,
            },
          });

          const data: LoginSuccessResponse = await response.json();
          if (!data.data) {
            return {
              ...token,
              error: 'RefreshTokenExpired',
            };
          }
          return {
            ...token,
            accessToken: data.data.accessToken,
            expiresAt: getTokenExpiration(data.data.accessToken),
          };
        } catch (error) {
          console.error(
            '[refresh error]',
            error instanceof Error ? error.message : 'Unknown error',
          );
          return {
            ...token,
            error: 'RefreshTokenExpired',
          };
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        expiresAt: token.expiresAt as number | undefined,
        user: token.user as Session['user'],
        role: token.role as Session['role'],
        accessToken: token.accessToken as string | undefined,
        refreshToken: token.refreshToken as string | undefined,
        error: token.error as string | undefined,
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
