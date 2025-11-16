'use client';

import { useRef, useState } from 'react';
import DotsPulseLoader from './DotsPulseLoader';
import { Button } from './button';

interface SafeFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  title: string;
  disabled?: boolean;
  buttonClassName?: string;
  formClassName?: string;
}

function SafeForm({
  children,
  onSubmit,
  title,
  disabled,
  buttonClassName,
  formClassName,
}: SafeFormProps) {
  const isLoadingRef = useRef(false);
  const [reRender, setReRender] = useState(false);

  return (
    <form
      className={formClassName}
      onSubmit={async (e) => {
        e.preventDefault();
        if (isLoadingRef.current) {
          return;
        }
        isLoadingRef.current = true;
        setReRender((prev) => !prev);
        await onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
        isLoadingRef.current = false;
        setReRender((prev) => !prev);
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
          {title}
        </Button>
      )}
    </form>
  );
}

export default SafeForm;
