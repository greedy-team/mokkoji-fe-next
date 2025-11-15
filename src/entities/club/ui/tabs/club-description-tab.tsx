import convertLinkText from '@/entities/recruit-detail/util/convetLinkText';

interface ClubDescriptionTabProps {
  description?: string;
}

function ClubDescriptionTab({ description }: ClubDescriptionTabProps) {
  return (
    <div>
      {description ? (
        <p className="text-text-secondary pt-8 text-sm leading-[1.4] whitespace-pre-wrap lg:text-lg">
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

export default ClubDescriptionTab;
