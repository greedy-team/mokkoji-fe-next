'use client';

import NavButton from '@/shared/ui/nav-button';
import { usePathname, useSearchParams } from 'next/navigation';

const navItems = [
  { label: '중앙동아리', value: 'central_club' },
  { label: '기타동아리', value: 'department_club' },
  { label: '소모임', value: '' },
];

export default function NavSection() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const affiliation = searchParams.get('affiliation');

  return (
    <div className="mr-12 flex flex-row gap-4">
      {navItems.map(({ label, value }) => (
        <NavButton
          key={value}
          label={label}
          href={`/recruit?affiliation=${value}`}
          navProps="pb-2 text-xs"
        />
      ))}
    </div>
  );
}
