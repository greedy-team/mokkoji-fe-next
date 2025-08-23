import Link from 'next/link';

const KEYWORDS = [
  {
    name: '문화/예술🎨',
    category: 'cultural_art',
  },
  {
    name: '학술/교양📚',
    category: 'academic_cultural',
  },
  {
    name: '봉사/사회🫶',
    category: 'volunteer_social',
  },
  {
    name: '체육🎾',
    category: 'sports',
  },
  {
    name: '종교🙏',
    category: 'religious',
  },
  {
    name: '기타',
    category: 'other',
  },
];

function HomeKeywordList() {
  return (
    <div className="mb-2 flex flex-wrap justify-center gap-3 lg:mb-6 lg:gap-5 lg:px-28">
      {KEYWORDS.map((keyword) => (
        <Link
          key={keyword.name}
          href={`/search?category=${keyword.category === 'all' ? '' : keyword.category}`}
          className="text-md w-fit cursor-pointer rounded-full bg-[#F2F4F6] px-3 py-1 font-semibold transition-colors hover:bg-[#dadddf] lg:px-5 lg:py-2 lg:text-xl"
        >
          {keyword.name}
        </Link>
      ))}
    </div>
  );
}

export default HomeKeywordList;
