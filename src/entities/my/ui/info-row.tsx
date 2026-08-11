import { ReactNode } from 'react';

type InfoRowProps = {
  label: string;
  value?: ReactNode;
  children?: ReactNode;
};

export default function InfoRow({ label, value, children }: InfoRowProps) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-start py-2">
      <span className="text-text-secondary flex text-sm font-bold">
        {label}
      </span>
      <div className="flex flex-col items-start justify-start gap-2 text-sm">
        {value}
        {children}
      </div>
    </div>
  );
}
