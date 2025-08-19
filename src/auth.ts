import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import getTokenExpiration from './shared/lib/getTokenExpiration';
import serverApi from './shared/api/server-api';
import {
  LoginSuccessResponse,
  ManageClubResponse,
  RoleResponse,
} from './features/login/model/type';
import UserInfoType from './entities/my/model/type';
import { UserRole } from './shared/model/type';

// TODO: 추후 루시아로 변경
export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  pages: {
    error: '/login?callbackUrl=/',
  },
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

        try {
          const headers = {
            Authorization: `Bearer ${user.accessToken}`,
          };
          const rolesRes = await serverApi.get('users/roles', { headers });
          const rolesData: RoleResponse = await rolesRes.json();
          let manageClubInfo: ManageClubResponse = { data: { clubs: [] } };
          if (rolesData.data.role !== UserRole.NORMAL) {
            const manageClubInfoRes = await serverApi.get(
              'users/manage/clubs',
              {
                headers,
              },
            );
            manageClubInfo = await manageClubInfoRes.json();
          }
          return {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            expiresAt: expiredTime,
            user: user.user,
            role: rolesData.data.role,
            manageClubInfo: manageClubInfo.data.clubs,
          };
        } catch (error) {
          console.error('[role fetch error]', error);
          return {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            expiresAt: expiredTime,
            user: user.user,
          };
        }
      }

      if (Date.now() > (token.expiresAt as number)) {
        try {
          const response = await serverApi.post('users/auth/refresh', {
            headers: {
              Authorization: `Bearer ${token.refreshToken}`,
            },
          });

          const data: LoginSuccessResponse = await response.json();
          return {
            accessToken: data.data.accessToken,
            expiresAt: getTokenExpiration(data.data.accessToken),
          };
        } catch (error) {
          signOut();
          console.error('[refresh error]', error);
          return null;
        }
      }
      return token;
    },
    // TODO: 추후 타입 수정
    session: async ({ session, token }) => {
      return {
        expiresAt: token.expiresAt,
        user: token.user,
        role: token.role,
        manageClubInfo: token.manageClubInfo,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      } as Session;
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
