import convertLinkText from '@/entities/club-detail/util/convertLinkText';
import getClubDetail from '@/entities/club-detail/api/getClubDetail';

interface ClubDescriptionWidgetProps {
  clubId: number;
}

async function ClubDescriptionWidget({ clubId }: ClubDescriptionWidgetProps) {
  const clubDetailResponse = await getClubDetail(clubId);
  const description = clubDetailResponse.data?.description;

  return (
    <div className="min-h-[300px] w-full">
      {description ? (
        <p className="text-text-secondary text-sm leading-[1.4] break-words whitespace-pre-wrap lg:text-lg">
          <span
            dangerouslySetInnerHTML={{
              __html: convertLinkText(description),
            }}
          />
        </p>
      ) : (
        <p className="py-30 text-center text-gray-500">
          동아리 소개 정보가 없습니다.
        </p>
      )}
    </div>
  );
}

export default ClubDescriptionWidget;
