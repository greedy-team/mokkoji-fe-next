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
    <header
      className="mt-10 mb-10 h-[164px] w-full lg:mt-[79px] lg:mb-18"
      id="top"
    >
      <nav className="mb-4 flex flex-row justify-between lg:mb-8">
        <h1 className="text-md mr-2 h-[36px] font-extrabold text-[#00E457] lg:text-2xl">
          {title}
        </h1>
        {children}
      </nav>
      <h2 className="text-lg font-bold whitespace-pre-wrap text-[#474747] lg:text-4xl lg:leading-[48px]">
        {description}
      </h2>
    </header>
  );
}

export default SectionHeader;
