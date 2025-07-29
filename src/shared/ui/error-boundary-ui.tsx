'use client';

import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from './button';

interface ErrorFallbackProps {
  message?: string;
}

function ErrorBoundaryUi({ message }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
      <AlertCircle className="h-10 w-10 text-red-500" />
      <p className="text-lg font-medium">
        {message || '문제가 발생했습니다. 다시 시도해주세요.'}
      </p>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => window.location.reload()}
      >
        <RotateCcw className="h-4 w-4" />
        새로고침
      </Button>
    </div>
  );
}

export default ErrorBoundaryUi;
