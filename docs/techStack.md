 ## 기술 스택 선정 이유

 ### next-auth
 - 로그인 간편화
 - 소셜 로그인(OAuth) → Google, Kakao, Github 등 쉽게 연동 가능
 - 쿠키를 통한 로직 관리
 - CSRF 보호, JWT 자동 암호화, Secure Cookie 처리
 - getServerSession(), auth() 같은 API 제공으로 서버-클라이언트 인증 일관성 유지
 
### next-auth 설정

- providers: Credentials, Google, GitHub 등의 인증 공급자를 지정합니다.
- session: 세션 관리 방식을 지정합니다.
- pages: 사용자 정의 페이지 경로를 지정하며, 로그인 페이지의 기본값은 /auth/signin입니다.
- callbacks: 인증 및 세션 관리 중 호출되는 각 핸들러를 지정합니다.
- callbacks.signIn: 사용자 로그인을 시도했을 때 호출되며, true를 반환하면 로그인 성공, false를 반환하면 로그인 실패로 처리됩니다.
- callbacks.redirect: 페이지 이동 시 호출되며, 반환하는 값은 리다이렉션될 URL입니다.
- callbacks.jwt: JWT가 생성되거나 업데이트될 때 호출되며, 반환하는 값은 암호화되어 쿠키에 저장됩니다.
- callbacks.session: jwt 콜백이 반환하는 token을 받아, 세션이 확인될 때마다 호출되며, 반환하는 값은 클라이언트에서 확인할 수 있습니다. (2번 이상 호출될 수 있습니다)

 > next-auth를 사용하지 않고, 그냥 구현하면 무엇이 문제인가?



### next-auth 버전

- next-auth@5.0.0-beta.28
- next@15.3.4
- nextjs15 버전과의 호환성 문제로 beta 버전 사용

### react-calendar
- 캘린더 로직 단순화
- 개발 시간 단축