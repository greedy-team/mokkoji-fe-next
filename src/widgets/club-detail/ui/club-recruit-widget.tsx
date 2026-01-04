'use client';

import RecruitDetailView from '@/entities/club-detail/ui/recruit-detail-view';
import ClubDetailRecruitmentEdit from '@/features/club-detail/ui/club-detail-recruitment-edit';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ky from 'ky';
import { useRouter } from 'next/navigation';
import deleteRecruitmentForm from '@/widgets/club-detail/api/deleteRecruitment';
import RecruitHistorySection from '@/entities/club-detail/ui/recruit-history-section';
import { ClubRecruitments } from '@/views/club/model/type';

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
  isManageClub?: boolean;

  clubId: number;
  recruitHistories: ClubRecruitments[];
  rid: number;
  recruitDetail: RecruitDetail;
}

function ClubRecruitWidget({
  isManageClub,
  clubId,
  recruitHistories,
  rid,
  recruitDetail,
}: ClubRecruitWidgetProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const confirmDelete = window.confirm('모집 공고를 삭제하시겠습니까?');
    if (!confirmDelete) return;

    const res = await deleteRecruitmentForm(clubId);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    if (Array.isArray(res.data?.deleteImageUrls)) {
      await Promise.all(
        res.data.deleteImageUrls.map((url: string) => ky.delete(url)),
      );
    }
    toast.success('모집 공고 삭제가 성공적으로 업로드되었습니다!');
    router.push('/recruit');
  };

  return (
    <>
      {isManageClub && (
        <div className="mb-6 flex cursor-pointer justify-end gap-4 text-base text-[#9C9C9C] lg:mb-0">
          <button
            onClick={() => setIsEditing(true)}
            className="cursor-pointer text-[#00E457] hover:underline"
          >
            수정하기
          </button>
          <button
            onClick={handleDelete}
            className="cursor-pointer text-red-400 hover:underline"
          >
            삭제하기
          </button>
        </div>
      )}
      {!isEditing ? (
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
        </>
      ) : (
        <ClubDetailRecruitmentEdit
          title={recruitDetail.title}
          clubName={recruitDetail.clubName}
          category={recruitDetail.category}
          content={recruitDetail.content}
          recruitForm={recruitDetail.recruitForm}
          recruitStart={recruitDetail.recruitStart}
          recruitEnd={recruitDetail.recruitEnd}
          clubId={clubId}
          setIsEditing={setIsEditing}
          imageUrls={recruitDetail.imageUrls}
        />
      )}
    </>
  );
}

export default ClubRecruitWidget;
