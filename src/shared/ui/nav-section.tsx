'use client';

import AffiliationNavButton from './affiliation-nav-button';

const navItems = [
  { label: '중앙동아리', value: 'central_club' },
  { label: '기타동아리', value: 'department_club' },
  { label: '소모임', value: 'small_group' },
];

interface NavSectionProps {
  href: string;
}

export default function NavSection({ href }: NavSectionProps) {
  return (
    <div className="flex flex-row lg:mr-12 lg:gap-4">
      {navItems.map(({ label, value }) => (
        <AffiliationNavButton
          key={value}
          label={label}
          href={`${href}?affiliation=${value}`}
          navProps="lg:pb-2 text-[10px] lg:text-xs"
          value={value}
        />
      ))}
    </div>
  );
}
