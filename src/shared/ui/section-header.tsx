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
        <h1 className="text-md text-primary-500 mr-2 h-[36px] font-extrabold lg:text-2xl">
          {title}
        </h1>
        {children}
      </nav>
      <h2 className="text-text-primary text-lg font-bold whitespace-pre-wrap lg:text-4xl lg:leading-[48px]">
        {description}
      </h2>
    </header>
  );
}

export default SectionHeader;
