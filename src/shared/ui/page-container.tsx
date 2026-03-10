import cn from '@/shared/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

function PageContainer({
  children,
  className,
  as: Component = 'div',
}: PageContainerProps) {
  return (
    <Component className={cn('mx-auto w-full sm:w-4xl lg:w-6xl', className)}>
      {children}
    </Component>
  );
}

export default PageContainer;
