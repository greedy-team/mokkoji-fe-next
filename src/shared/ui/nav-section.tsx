'use client';

import AffiliationNavButton from './affiliation-nav-button';

const navItems = [
  { label: '중앙동아리', value: 'central_club' },
  { label: '기타동아리', value: 'department_club' },
  { label: '소모임', value: '' },
];

interface NavSectionProps {
  href: string;
}

export default function NavSection({ href }: NavSectionProps) {
  return (
    <div className="mr-12 flex flex-row gap-4">
      {navItems.map(({ label, value }) => (
        <AffiliationNavButton
          key={value}
          label={label}
          href={`${href}?affiliation=${value}`}
          navProps="pb-2 text-xs"
          value={value}
        />
      ))}
    </div>
  );
}
