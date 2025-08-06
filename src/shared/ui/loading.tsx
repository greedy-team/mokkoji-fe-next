function SharedLoading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center">
      <div className="mb-6 h-12 w-12 animate-spin rounded-full border-4 border-[#00E804] border-t-transparent" />

      <h1 className="mb-2 text-2xl font-bold">
        <span className="text-[#00E804]">로딩중</span>
        <span className="text-gray-700">이에요!</span>
      </h1>
      <p className="mb-4 text-gray-500">잠시만 기다려주세요.</p>
    </div>
  );
}

export default SharedLoading;
