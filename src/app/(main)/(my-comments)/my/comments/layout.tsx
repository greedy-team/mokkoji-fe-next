export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex flex-col px-[20%] py-10">{children}</main>;
}
