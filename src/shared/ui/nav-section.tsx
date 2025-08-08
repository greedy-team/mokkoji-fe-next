'use client';

import AffiliationNavButton from './affiliation-nav-button';

const navItems = [
  { label: '중앙동아리', value: 'CENTRAL_CLUB' },
  { label: '기타동아리', value: 'DEPARMENT_CLUB' },
  { label: '소모임', value: 'SMALL_GROUP' },
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
