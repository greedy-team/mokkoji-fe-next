import { jwtDecode } from 'jwt-decode';

export default function getTokenExpiration(token: string): number | null {
  try {
    const decoded = jwtDecode<{ exp?: number }>(token);
    return decoded.exp ? decoded.exp * 1000 : null;
  } catch (e) {
    console.error('Failed to decode token', e);
    return null;
  }
}
