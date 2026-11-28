import type { UserRole } from '@/shared/model/type';
import type UserInfoType from '@/shared/model/user';

export interface Session {
  user: UserInfoType;
  role?: UserRole;
  universityCode?: string;
}
