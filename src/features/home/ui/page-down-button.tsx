'use client';

import Image from 'next/image';
import mainDownArrowIcon from '@/shared/assets/images/main/downArrow.svg';

function HomeDownButton() {
  const handleScroll = () => {
    const target = document.getElementById('scroll-target');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <button onClick={handleScroll}>
      <Image
        src={mainDownArrowIcon}
        alt="아래 스크롤"
        width={46}
        height={12}
        className="animate-up-down cursor-pointer"
      />
    </button>
  );
}

export default HomeDownButton;
