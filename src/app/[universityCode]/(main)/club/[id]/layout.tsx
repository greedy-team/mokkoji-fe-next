export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-[95vw] flex-col items-center justify-center lg:w-[60%] lg:max-w-[60%] lg:min-w-[60%]">
      {children}
    </main>
  );
}
