import { ReactNode } from 'react';

type InfoRowProps = {
  label: string;
  value?: ReactNode;
  children?: ReactNode;
};

export default function InfoRow({ label, value, children }: InfoRowProps) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-center gap-4 py-3">
      <span className="font-bold text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        {value}
        {children}
      </div>
    </div>
  );
}
