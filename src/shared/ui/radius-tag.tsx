import clsx from 'clsx';

interface RadiusTagProps {
  className?: string;
  label: string;
}

function RadiusTag({ className, label }: RadiusTagProps) {
  return (
    <span
      className={clsx(
        'h-[30px] w-auto rounded-full p-2 text-center text-xs',
        className,
      )}
    >
      {label}
    </span>
  );
}

export default RadiusTag;
