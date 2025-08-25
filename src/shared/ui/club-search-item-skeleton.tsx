function ClubSearchItemSkeleton() {
  return (
    <article className="mb-3 animate-pulse rounded-lg border-2 border-gray-100 bg-white p-4">
      <header className="mb-2">
        <div className="flex items-center gap-2">
          <div className="h-5 w-24 rounded bg-gray-200" />

          <div className="h-4 w-16 rounded bg-gray-200" />
        </div>
      </header>

      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
      </div>
    </article>
  );
}

export default ClubSearchItemSkeleton;
