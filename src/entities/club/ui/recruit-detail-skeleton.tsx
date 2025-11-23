function RecruitDetailSkeleton() {
  return (
    <div className="mt-20 mb-10 max-w-[95%] min-w-[95%] animate-pulse lg:max-w-[85%] lg:min-w-[75%]">
      {/* === 헤더 영역 === */}
      <header className="w-full border-b border-b-[#D6D6D6] pb-4">
        <div className="mb-4 flex flex-row items-center gap-5">
          {/* 아바타 */}
          <div className="h-12 w-12 rounded-full bg-gray-300 lg:h-14 lg:w-14" />
          {/* 타이틀 */}
          <div className="flex flex-col gap-2">
            <div className="h-6 w-32 rounded bg-gray-300 lg:h-8 lg:w-48" />
            <div className="h-4 w-24 rounded bg-gray-200 lg:h-6 lg:w-32" />
          </div>
        </div>
        <div className="mb-2 flex flex-row items-center gap-2">
          <div className="h-6 w-16 rounded-full bg-gray-300" />{' '}
          {/* 상태 태그 */}
          <div className="h-4 w-40 rounded bg-gray-200 lg:h-6" /> {/* 기간 */}
        </div>
      </header>

      {/* === 본문 설명 === */}
      <div className="mt-6 space-y-3">
        <div className="h-4 w-11/12 rounded bg-gray-200" />
        <div className="h-4 w-10/12 rounded bg-gray-200" />
        <div className="h-4 w-9/12 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default RecruitDetailSkeleton;
