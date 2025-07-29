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
    <div className="mb-10 flex flex-wrap justify-center gap-5 px-28">
      {KEYWORDS.map((keyword) => (
        <Link
          key={keyword}
          href={`/search?q=${keyword}`}
          className="w-fit cursor-pointer rounded-full bg-[#F2F4F6] px-5 py-2 text-xl font-semibold transition-colors hover:bg-[#dadddf]"
        >
          {keyword}
        </Link>
      ))}
    </div>
  );
}

export default HomeKeywordList;
