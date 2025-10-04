import React from 'react';
import Link from 'next/link';

interface ErrorPageProps {
  statusCode?: number;
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

export default function ErrorPage({
  statusCode = 404,
  title,
  message,
  showHomeButton = true,
}: ErrorPageProps) {
  const defaultTitle = statusCode === 404 ? '404 Error' : '오류가 발생했습니다';
  const defaultMessage =
    statusCode === 404
      ? '요청하신 페이지를 찾을 수 없습니다.'
      : '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center">
      <h1 className="mb-2 text-3xl font-bold text-gray-700">
        {title || defaultTitle}
      </h1>
      <p className="mb-4 text-gray-800">{message || defaultMessage}</p>
      {showHomeButton && (
        <Link
          href="/"
          className="mb-6 font-bold text-green-500 hover:underline"
        >
          홈으로 돌아가기
        </Link>
      )}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-2xl text-gray-800">
        {/* SVG 느낌표 아이콘 */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="10" fill="#BDBDBD" />
          <text
            x="10"
            y="15"
            textAnchor="middle"
            fontSize="16"
            fill="white"
            fontWeight="bold"
          >
            !
          </text>
        </svg>
      </div>
    </div>
  );
}
