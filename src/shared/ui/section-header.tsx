import { ReactNode } from 'react';

function SectionHeader({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-8 w-full" id="top">
      <nav className="mb-3 flex flex-row justify-between">
        <h1 className="mr-2 text-xl font-bold text-[#00E457]">{title}</h1>
        {children}
      </nav>
      <h2 className="mt-2 mb-2 text-2xl font-bold whitespace-pre-wrap text-[474747]">
        {description}
      </h2>
    </header>
  );
}

export default SectionHeader;
