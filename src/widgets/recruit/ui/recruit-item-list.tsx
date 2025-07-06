import RecruitItem from '@/entities/recruit/ui/recruit-item';
import getRecruitList from '../api/getRecruitList';

async function RecruitItemList() {
  const data = await getRecruitList({
    page: 1,
    size: 10,
    keyword: undefined,
    category: undefined,
    affiliation: undefined,
    recruitStatus: undefined,
  });
  console.log('recruitData', data);

  return (
    <ul className="grid w-auto grid-cols-3 gap-4">
      {data.map((item) => (
        <li key={item.id}>
          <RecruitItem
            title={item.name}
            startDate={item.recruitStartDate}
            endDate={item.recruitEndDate}
            description={item.description}
            isFavorite={item.isFavorite}
            imgUrl={item.imageURL}
          />
        </li>
      ))}
    </ul>
  );
}

export default RecruitItemList;
