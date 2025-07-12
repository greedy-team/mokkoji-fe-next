import ProgressBar from '@/entities/loading/ui/progress-bar';

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center">
      <h1 className="mb-2 text-2xl font-bold">
        <span className="text-green-500">로딩중</span>
        <span className="text-gray-700">이에요!</span>
      </h1>
      <p className="mb-4 text-gray-500">잠시만 기다려주세요.</p>
      <ProgressBar />
    </div>
  );
}
