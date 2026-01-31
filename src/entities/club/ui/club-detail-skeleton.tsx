const dummyTabs = [1, 2, 3];

function ClubDetailSkeleton() {
  return (
    <div className="mt-6 px-5 lg:mt-[50px] lg:w-[60%] lg:max-w-[60%] lg:min-w-[60%]">
      <header className="w-full">
        <div className="mb-4 flex flex-row items-center gap-3.5 lg:mb-8 lg:gap-4">
          <div className="hidden rounded-full bg-gray-300 sm:block lg:h-18 lg:w-18" />
          <div className="h-7 w-40 rounded bg-gray-300 lg:h-10 lg:w-60" />
          <div className="h-7 w-32 rounded bg-gray-200 lg:h-10 lg:w-48" />
        </div>

        <div className="flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:text-xl">
          <div className="h-8 w-16 shrink-0 rounded-full bg-gray-300 lg:h-7 lg:w-20" />

          <div className="flex flex-col gap-1 lg:gap-2">
            <div className="h-5 w-56 rounded bg-gray-200 lg:h-6 lg:w-72" />
            <div className="mr-auto shrink-0">
              <div className="mt-1 h-4 w-40 rounded bg-gray-200 lg:h-5 lg:w-52" />
            </div>
          </div>

          <div className="flex shrink-0 gap-2 lg:mt-0 lg:ml-auto">
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
          <div className="mt-12 space-y-4">
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
