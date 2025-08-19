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
        <h1 className="text-md mr-2 font-extrabold text-[#00E457] lg:text-xl">
          {title}
        </h1>
        {children}
      </nav>
      <h2 className="mt-2 mb-2 text-lg font-bold whitespace-pre-wrap text-[#474747] lg:text-2xl">
        {description}
      </h2>
    </header>
  );
}

export default SectionHeader;
