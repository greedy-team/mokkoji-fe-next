function ClubTextCard() {
  return (
    <div className="flex h-full w-[50%] flex-col justify-center">
      <h4 className="text-2xl font-bold text-[#00E457]">전체 동아리</h4>
      <p className="my-3 w-72 text-3xl font-bold">
        우리 학교의 동아리들을 한눈에 확인해요.
      </p>
      <span className="my-3 text-2xl font-semibold text-[#9C9C9C]">
        간단한 동아리 설명과 동아리 카테고리를 확인할 수 있어요.
      </span>
    </div>
  );
}

export default ClubTextCard;
