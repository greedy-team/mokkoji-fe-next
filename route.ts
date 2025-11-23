/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ['/my/:path*'];

export const publicRoutes = [
  '/',
  '/register',
  '/favorite',
  '/club',
  '/club/:path*',
  '/search/:path*',
  '/support',
  '/test/:path*',
  '/favorite/:path*',
  '/logs',
];
