import ClubTextCard from '@/entities/home/ui/club-text-card';
import RecruitTextCard from '@/entities/home/ui/recruit-text-card';
import AnimateOnView from '@/features/home/util/animate-viewport';
import Image from 'next/image';

function ClubCardMobileWidget() {
  return (
    <div className="flex flex-col gap-50">
      <div
        id="scroll-target"
        className="flex h-fit flex-col items-center gap-13 pt-30"
      >
        <ClubTextCard />
        <AnimateOnView animation="reveal">
          <Image
            src="/main/clubcard.png"
            alt="전체동아리 이미지"
            width={257}
            height={514}
          />
        </AnimateOnView>
      </div>
      <div className="mb-40 flex h-fit w-full flex-col items-center gap-6">
        <RecruitTextCard />
        <AnimateOnView animation="reveal">
          <Image
            src="/main/sampleClubCard.png"
            alt="샘플카드 이미지"
            width={246}
            height={110}
          />
        </AnimateOnView>
        <AnimateOnView animation="reveal">
          <Image
            src="/main/sampleRecruitment.png"
            alt="샘플모집공고 이미지"
            width={245}
            height={489}
          />
        </AnimateOnView>
      </div>
    </div>
  );
}

export default ClubCardMobileWidget;
