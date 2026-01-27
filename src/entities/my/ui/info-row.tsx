import { ReactNode } from 'react';

type InfoRowProps = {
  label: string;
  value?: ReactNode;
  children?: ReactNode;
};

export default function InfoRow({ label, value, children }: InfoRowProps) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-center gap-4 py-3">
      <span className="flex font-bold text-gray-600">{label}</span>
      <div className="flex flex-col items-start justify-start lg:flex lg:gap-2">
        {value}
        {children}
      </div>
    </div>
  );
}
