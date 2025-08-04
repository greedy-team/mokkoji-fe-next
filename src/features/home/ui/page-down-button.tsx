'use client';

import Image from 'next/image';

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
        src="/main/downArrow.svg"
        alt="아래 스크롤"
        width={46}
        height={12}
        className="animate-up-down cursor-pointer"
      />
    </button>
  );
}

export default HomeDownButton;
