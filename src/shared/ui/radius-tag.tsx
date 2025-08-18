import clsx from 'clsx';

interface RadiusTagProps {
  className?: string;
  label: string;
}

function RadiusTag({ className, label }: RadiusTagProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-[6px] text-center text-[10px] lg:py-1 lg:text-xs',
        className,
      )}
    >
      {label}
    </span>
  );
}

export default RadiusTag;
