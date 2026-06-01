interface UserInfoType {
  id: number;
  name: string | null;
  email: string | null;
  role: string;
  emailOn: boolean;
  universityCode: string | null;
}

export default UserInfoType;
