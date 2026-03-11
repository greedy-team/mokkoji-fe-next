export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-[95vw] flex-col items-center justify-center">
      {children}
    </main>
  );
}
