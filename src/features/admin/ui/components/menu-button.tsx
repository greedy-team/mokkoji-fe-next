'use client';

import Image from 'next/image';
import adminArrowIcon from '@/shared/assets/images/admin/arrow.svg';

interface MenuButtonProps {
  label: string;
  onClick: () => void;
}

function MenuButton({ label, onClick }: MenuButtonProps) {
  return (
    <button
      type="button"
      className="flex cursor-pointer gap-2 lg:gap-3.5"
      onClick={onClick}
    >
      <span className="text-base font-bold lg:text-2xl">{label}</span>
      <Image
        src={adminArrowIcon}
        alt="바로가기"
        width={18}
        height={14}
        className="h-auto w-4"
      />
    </button>
  );
}

export default MenuButton;
