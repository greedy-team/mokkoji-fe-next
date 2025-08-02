interface ClubRegisterHeaderProps {
  children: React.ReactNode;
}

async function ClubRegisterHeader({ children }: ClubRegisterHeaderProps) {
  return <header className="my-6 text-2xl font-bold">{children}</header>;
}

export default ClubRegisterHeader;
