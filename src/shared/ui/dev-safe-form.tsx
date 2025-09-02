'use client';

import { useRef, useState } from 'react';

interface SafeFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  title: string;
  disabled?: boolean;
  buttonClassName?: string;
  formClassName?: string;
  style?: React.CSSProperties;
  handleClose?: () => void;
}

function SafeDevForm({
  children,
  onSubmit,
  title,
  disabled,
  buttonClassName,
  formClassName,
  style,
  handleClose,
}: SafeFormProps) {
  const isLoadingRef = useRef(false);
  const [reRender, setReRender] = useState(false);

  return (
    <form
      style={style}
      className={formClassName}
      onSubmit={async (e) => {
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
      <div className="mr-2 mb-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={handleClose}
          className="rounded bg-gray-300 px-2 py-1 text-xs"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isLoadingRef.current || disabled}
          className={buttonClassName}
        >
          {isLoadingRef.current ? '로딩 중...' : title}
        </button>
      </div>
    </form>
  );
}

export default SafeDevForm;
