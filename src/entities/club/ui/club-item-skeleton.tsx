function ClubItemSkeleton() {
  return (
    <div className="relative flex min-h-[90px] w-[100%] animate-pulse flex-col gap-2 rounded-lg bg-[#F8F8F8] p-3 text-[#474747] lg:min-h-[180px] lg:w-auto lg:p-5">
      <div className="mb-2 flex flex-row items-center justify-between lg:mb-8">
        <div className="flex flex-row items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-300 lg:h-14 lg:w-14" />
          <div className="flex flex-col gap-2">
            <div className="h-3 w-20 rounded bg-gray-300 lg:h-4 lg:w-24" />
            <div className="h-4 w-32 rounded bg-gray-300 lg:h-5 lg:w-40" />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="h-3 w-4/5 rounded bg-gray-300 lg:h-4" />
      </div>
      <div className="absolute right-4 bottom-4 h-6 w-6 rounded-full bg-gray-300" />
    </div>
  );
}

export default ClubItemSkeleton;
