'use client';

import RecruitDetailView from '@/entities/club-detail/ui/recruit-detail-view';
import RecruitHistorySection from '@/entities/club-detail/ui/recruit-history-section';
import { ClubRecruitments } from '@/views/club/model/type';
import NavigateRecruitForm from '@/features/club-detail/ui/navigate-recruit-form';

interface RecruitDetail {
  title: string;
  clubName: string;
  category: string;
  content: string;
  recruitForm: string;
  imageUrls: string[];
  recruitStart: string;
  recruitEnd: string;
}
interface ClubRecruitWidgetProps {
  clubId: number;
  recruitHistories: ClubRecruitments[];
  rid: number;
  recruitDetail: RecruitDetail;
}

function ClubRecruitWidget({
  clubId,
  recruitHistories,
  rid,
  recruitDetail,
}: ClubRecruitWidgetProps) {
  return (
    <>
      <RecruitDetailView
        title={recruitDetail.title}
        content={recruitDetail.content}
        recruitForm={recruitDetail.recruitForm}
        imageUrls={recruitDetail.imageUrls}
      />
      <RecruitHistorySection
        clubId={clubId}
        recruitHistories={recruitHistories}
        selectedRid={rid}
      />
      <div className="fixed right-2 bottom-5 z-50 lg:right-[calc((100vw-60vw)/2+24px)] lg:bottom-8 lg:bottom-14">
        <NavigateRecruitForm recruitForm={recruitDetail.recruitForm} />
      </div>
    </>
  );
}

export default ClubRecruitWidget;
