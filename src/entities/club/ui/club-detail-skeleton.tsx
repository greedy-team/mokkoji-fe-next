const detailDummyArray = [1, 2, 3, 4, 5];
const commentDummyArray = [1, 2, 3];

function ClubDetailSkeleton() {
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

      {/* === 댓글 입력 + 댓글 리스트 === */}
      <section className="mt-10 flex flex-col gap-6">
        {/* 댓글 입력 영역 */}
        <div className="flex flex-col gap-3 rounded-2xl border border-[#D6D6D6] p-5">
          <div className="h-5 w-32 rounded bg-gray-300" />{' '}
          {/* "이 동아리 어때요?" */}
          <div className="flex gap-1">
            {detailDummyArray.map((item) => (
              <div key={item} className="h-6 w-6 rounded bg-gray-300" />
            ))}
          </div>
          <div className="h-20 w-full rounded-md bg-gray-200" />{' '}
          {/* Textarea */}
          <div className="flex justify-end">
            <div className="h-[43px] w-[113px] rounded bg-gray-300" />
          </div>
        </div>

        {/* 댓글 리스트 */}
        <div className="flex flex-col gap-4">
          {commentDummyArray.map((item) => (
            <div
              key={item}
              className="flex gap-4 rounded-2xl border border-[#D6D6D6] p-5"
            >
              <div className="h-10 w-10 rounded-full bg-gray-300" />
              <div className="flex w-full flex-col gap-2">
                <div className="h-4 w-2/5 rounded bg-gray-300" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ClubDetailSkeleton;
