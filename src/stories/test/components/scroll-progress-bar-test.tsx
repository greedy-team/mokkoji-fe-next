import { useEffect, useRef } from 'react';

function ScrollProgressBarSmooth() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      if (barRef.current) {
        barRef.current.style.width = `${scrollPercent}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 z-[9999] h-[4px] transition-[width] duration-200 ease-out"
      style={{
        width: '0%',
        background:
          'linear-gradient(to right, #00e804 0%, #3ae2eb 73%, #3aa1eb 100%)',
      }}
    />
  );
}

export default ScrollProgressBarSmooth;
