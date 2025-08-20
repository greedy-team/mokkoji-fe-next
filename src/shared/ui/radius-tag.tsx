import clsx from 'clsx';

interface RadiusTagProps {
  className?: string;
  label: string;
}

function RadiusTag({ className, label }: RadiusTagProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center rounded-full px-[11px] py-[7px] text-center text-[12px] font-semibold lg:py-[7px] lg:text-xs',
        className,
      )}
    >
      {label}
    </span>
  );
}

export default RadiusTag;
