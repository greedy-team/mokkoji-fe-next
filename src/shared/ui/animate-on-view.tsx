'use client';

import { useInView } from 'react-intersection-observer';

interface AnimateOnViewProps {
  children: React.ReactNode;
  animation?: string;
}

function AnimateOnView({ children, animation }: AnimateOnViewProps) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
    rootMargin: '0px 0px -100px 0px',
  });

  return (
    <div ref={ref} className={`${inView ? animation : 'opacity-0'}`}>
      {children}
    </div>
  );
}

export default AnimateOnView;
