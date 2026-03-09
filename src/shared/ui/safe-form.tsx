'use client';

import { useRef, useState } from 'react';
import DotsPulseLoader from './DotsPulseLoader';
import { Button } from './button';

interface SafeFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  submitLabel: string;
  disabled?: boolean;
  buttonClassName?: string;
  formClassName?: string;
}

function SafeForm({
  children,
  onSubmit,
  submitLabel,
  disabled,
  buttonClassName,
  formClassName,
}: SafeFormProps) {
  const isLoadingRef = useRef(false);
  const [forceUpdateToggle, setForceUpdateToggle] = useState(false);

  return (
    <form
      className={formClassName}
      onSubmit={async (e) => {
        e.preventDefault();
        if (isLoadingRef.current) {
          return;
        }
        isLoadingRef.current = true;
        setForceUpdateToggle((prev) => !prev);
        await onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
        isLoadingRef.current = false;
        setForceUpdateToggle((prev) => !prev);
      }}
    >
      {children}
      {isLoadingRef.current ? (
        <DotsPulseLoader wrapperClassName="flex justify-center flex-col items-center" />
      ) : (
        <Button
          type="submit"
          disabled={isLoadingRef.current || disabled}
          className={buttonClassName}
        >
          {submitLabel}
        </Button>
      )}
    </form>
  );
}

export default SafeForm;
