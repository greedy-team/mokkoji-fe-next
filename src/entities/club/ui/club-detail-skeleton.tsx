const dummyTabs = [1, 2, 3];

function ClubDetailSkeleton() {
  return (
    <div className="mt-20 mb-10 w-[80%] animate-pulse lg:max-w-[85%] lg:min-w-[75%]">
      <header className="w-full cursor-default">
        <div className="mb-8 flex flex-row items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-300 lg:h-14 lg:w-14" />
          <div className="h-7 w-40 rounded bg-gray-300 lg:h-10 lg:w-60" />
          <div className="h-7 w-32 rounded bg-gray-200 lg:h-10 lg:w-48" />
        </div>

        <div className="flex items-center gap-6 lg:text-xl">
          <div className="h-6 w-16 shrink-0 rounded-full bg-gray-300 lg:h-7 lg:w-20" />

          <div className="flex flex-col gap-2 pt-4">
            <div className="h-5 w-56 rounded bg-gray-200 lg:h-6 lg:w-72" />
            <div className="h-4 w-40 rounded bg-gray-200 lg:h-5 lg:w-52" />
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-300 lg:h-10 lg:w-10" />
            <div className="h-9 w-9 rounded-full bg-gray-300 lg:h-10 lg:w-10" />
          </div>
        </div>
      </header>

      <div className="mt-16">
        <div className="flex justify-center border-b border-b-[#D6D6D6] pb-3">
          {dummyTabs.map((tab) => (
            <div key={tab} className="relative flex-1 text-center">
              <div className="mx-auto h-5 w-16 rounded bg-gray-300 lg:h-6 lg:w-20" />
              <div className="absolute bottom-[-13px] left-0 h-[2px] w-full bg-gray-200" />
            </div>
          ))}
        </div>

        <div className="mx-auto min-h-[600px] w-full">
          <div className="mt-8 space-y-4">
            <div className="h-6 w-2/3 rounded bg-gray-300 lg:h-7" />
            <div className="h-4 w-1/2 rounded bg-gray-200 lg:h-5" />
            <div className="space-y-3 pt-4">
              <div className="h-4 w-11/12 rounded bg-gray-200" />
              <div className="h-4 w-10/12 rounded bg-gray-200" />
              <div className="h-4 w-9/12 rounded bg-gray-200" />
              <div className="h-4 w-10/12 rounded bg-gray-200" />
              <div className="h-4 w-8/12 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubDetailSkeleton;
