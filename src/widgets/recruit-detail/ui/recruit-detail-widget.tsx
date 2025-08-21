'use client';

import RecruitDetailView from '@/entities/recruit-detail/ui/recruit-detail-view';
import ClubDetailRecruitmentEdit from '@/features/club-detail/ui/club-detail-recruitment-edit';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ky from 'ky';
import { useRouter } from 'next/navigation';
import deleteRecruitmentForm from '../api/deleteRecruitment';

interface RecruitDetailWidgetProps {
  isManageClub?: boolean;
  title: string;
  clubName: string;
  category: string;
  content: string;
  recruitForm: string;
  imageUrls: string[];
  recruitStart: string;
  recruitEnd: string;
  clubId: number;
}

function RecruitDetailWidget({
  isManageClub,
  title,
  clubName,
  category,
  content,
  recruitForm,
  imageUrls,
  recruitStart,
  recruitEnd,
  clubId,
}: RecruitDetailWidgetProps) {
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

    toast.success('모집 공고 삭제가 성공적으로 업로드되었습니다!', {
      toastId: 'unique-toast',
    });

    router.push('/recruit');
  };

  return (
    <>
      {isManageClub && (
        <div className="mb-6 flex cursor-pointer justify-end gap-4 text-base text-[#9C9C9C] lg:mb-0">
          <button
            onClick={() => setIsEditing(true)}
            className="cursor-pointer text-[#20E86C] underline"
          >
            수정하기
          </button>
          <button
            onClick={handleDelete}
            className="cursor-pointer text-red-300 underline"
          >
            삭제하기
          </button>
        </div>
      )}
      {!isEditing ? (
        <RecruitDetailView
          title={title}
          content={content}
          recruitForm={recruitForm}
          imageUrls={imageUrls}
        />
      ) : (
        <ClubDetailRecruitmentEdit
          title={title}
          clubName={clubName}
          category={category}
          content={content}
          recruitForm={recruitForm}
          recruitStart={recruitStart}
          recruitEnd={recruitEnd}
          clubId={clubId}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default RecruitDetailWidget;
