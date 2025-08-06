import Link from 'next/link';

const KEYWORDS = [
  '밴드',
  '서예',
  '학술동아리',
  '프로그래밍',
  '봉사',
  '스포츠',
  '종교',
  '마케팅',
];

function HomeKeywordList() {
  return (
    <div className="mb-2 flex flex-wrap justify-center gap-3 lg:mb-6 lg:gap-5 lg:px-28">
      {KEYWORDS.map((keyword) => (
        <Link
          key={keyword}
          href={`/search?q=${keyword}`}
          className="text-md w-fit cursor-pointer rounded-full bg-[#F2F4F6] px-3 py-1 font-semibold transition-colors hover:bg-[#dadddf] lg:px-5 lg:py-2 lg:text-xl"
        >
          {keyword}
        </Link>
      ))}
    </div>
  );
}

export default HomeKeywordList;
