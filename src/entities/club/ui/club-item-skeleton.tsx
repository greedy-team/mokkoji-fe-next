function ClubItemSkeleton() {
  return (
    <div className="relative flex h-[150px] w-[100%] animate-pulse flex-col gap-3 rounded-xl bg-[#F8F8F8] px-7 py-8 text-[#474747]">
      <div className="flex w-full">
        <div className="flex w-full items-center gap-4">
          <div className="h-[54px] w-[54px] rounded-full bg-gray-300" />
          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-1">
              <div className="h-5 w-24 rounded bg-gray-300" />
              <div className="h-5 w-5 rounded bg-gray-300" />
            </div>
            <div className="mt-2 h-4 w-48 rounded bg-gray-300" />
          </div>
        </div>
      </div>
      <div className="absolute top-8 right-7 h-5 w-16 rounded-full bg-gray-300" />
      <div className="h-4 w-full rounded bg-gray-300" />
    </div>
  );
}

export default ClubItemSkeleton;
