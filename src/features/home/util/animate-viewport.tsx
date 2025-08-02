'use client';

import { useInView } from 'react-intersection-observer';

interface Props {
  children: React.ReactNode;
  animation?: string;
}

function AnimateOnView({ children, animation }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });

  return (
    <div ref={ref} className={`${inView ? animation : 'opacity-0'}`}>
      {children}
    </div>
  );
}

export default AnimateOnView;
