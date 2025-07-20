import React from 'react';

interface KakaoIconProps {
  className?: string;
}

export default function KakaoIcon({ className = '' }: KakaoIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 1C4.48 1 0 4.58 0 9C0 11.55 1.43 13.87 3.69 15.31L2.79 18.76C2.71 19.08 3.06 19.33 3.34 19.16L7.88 16.5C8.59 16.67 9.29 16.75 10 16.75C15.52 16.75 20 13.17 20 8.75C20 4.33 15.52 1 10 1Z"
        fill="#000000"
      />
    </svg>
  );
}
