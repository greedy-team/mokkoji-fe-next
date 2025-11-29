function ClubSearchItemSkeleton() {
  return (
    <article className="mb-3 flex animate-pulse items-center gap-3 rounded-lg border-2 border-gray-100 bg-white p-4">
      <div className="h-12 w-12 rounded-full bg-gray-200 lg:h-14 lg:w-14" />

      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-28 rounded bg-gray-200" />
          <div className="h-4 w-16 rounded bg-gray-200" />
        </div>

        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>
    </article>
  );
}

export default ClubSearchItemSkeleton;
