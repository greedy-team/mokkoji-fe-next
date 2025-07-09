interface KeywordProps {
  keyword: string;
  onClick: (keyword: string) => void;
}

function HomeKeyword({ keyword, onClick }: KeywordProps) {
  return (
    <button
      className="w-fit cursor-pointer rounded-full bg-[#F2F4F6] px-5 py-2 text-xl font-semibold transition-colors hover:bg-[#dadddf]"
      onClick={() => onClick(keyword)}
    >
      {keyword}
    </button>
  );
}

export default HomeKeyword;
