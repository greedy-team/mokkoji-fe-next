'use client';

import { AlertCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import { Button } from './button';

interface ErrorFallbackProps {
  message?: string;
}

function ErrorBoundaryUiStory({ message }: ErrorFallbackProps) {
  return (
    <div className="max-w-10xl flex w-auto flex-col items-center justify-center gap-4 rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600 sm:w-[400px] lg:w-[600px]">
      <AlertCircle className="h-10 w-10 text-red-500" />
      <p className="text-lg font-medium">
        {message || '문제가 발생했습니다. 다시 시도해주세요.'}
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => {}}
        >
          <ArrowLeft className="h-4 w-4" />
          이전으로
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => window.location.reload()}
        >
          <RotateCcw className="h-4 w-4" />
          새로고침
        </Button>
      </div>
    </div>
  );
}

export default ErrorBoundaryUiStory;
