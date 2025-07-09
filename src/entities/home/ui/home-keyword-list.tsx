import HomeKeyword from '@/features/home/ui/home-keyword';

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

interface HomeKeywordListProps {
  onKeywordClick: (keyword: string) => void;
}

function HomeKeywordList({ onKeywordClick }: HomeKeywordListProps) {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-5 px-28">
      {KEYWORDS.map((keyword) => (
        <HomeKeyword key={keyword} keyword={keyword} onClick={onKeywordClick} />
      ))}
    </div>
  );
}

export default HomeKeywordList;
