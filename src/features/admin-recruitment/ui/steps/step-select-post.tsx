'use client';

import { useState } from 'react';
import { ClubRecruitments } from '@/views/club/model/type';
import { Button } from '@/shared/ui/button';

interface Props {
  recruitments: ClubRecruitments[];
  onEdit: (post: ClubRecruitments) => void;
  onDelete: (post: ClubRecruitments) => Promise<void>;
  isDeleting?: boolean;
  title?: string;
}

function StepSelectPost({
  recruitments,
  onEdit,
  onDelete,
  isDeleting = false,
  title = '전체 모집 공고',
}: Props) {
  const [selectedPost, setSelectedPost] = useState<ClubRecruitments>();
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const handleSelect = (post: ClubRecruitments) => {
    setSelectedPost(post);
  };

  const handleDeleteClick = () => {
    setIsShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setIsShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedPost) {
      await onDelete(selectedPost);
      setIsShowDeleteModal(false);
      setSelectedPost(undefined);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col justify-between px-[11%] py-8">
      <div>
        <h1 className="text-[28px] font-bold">{title}</h1>

        {recruitments.length === 0 ? (
          <p className="mt-4 text-gray-400">등록된 모집글이 없습니다.</p>
        ) : (
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {recruitments.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`flex h-[121px] w-full cursor-pointer flex-col gap-2 rounded-[16px] border bg-[#141414] p-6 text-left transition-colors ${
                    selectedPost?.id === item.id
                      ? 'border-[#1AE166] bg-[#1F1F1F]'
                      : 'border-[#141414]'
                  }`}
                >
                  <p className="text-sm text-[#717171]">{item.recruitStart}</p>
                  <p className="line-clamp-2 font-medium">{item.title}</p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-end gap-3 pt-8">
        <Button
          type="button"
          variant="none"
          size="none"
          onClick={handleDeleteClick}
          disabled={!selectedPost}
          className="rounded-full border-2 border-[#1AE166] bg-[#1AE166] px-6 py-2.5 font-bold text-black transition-colors hover:bg-[#139c48] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          삭제하기
        </Button>
        <Button
          type="button"
          variant="none"
          size="none"
          onClick={() => selectedPost && onEdit(selectedPost)}
          disabled={!selectedPost}
          className="rounded-full border-2 border-[#1AE166] bg-transparent px-6 py-2.5 font-bold text-[#1AE166] transition-colors hover:bg-[#003b18] disabled:cursor-not-allowed disabled:opacity-50"
        >
          수정하기
        </Button>
      </div>

      {isShowDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="flex h-[168px] w-[442px] flex-col justify-center rounded-[20px] bg-[#1A1A1A] p-5">
            <p className="text-center text-[#FBFBFB]">
              모집 공고를 삭제하시겠습니까?
            </p>

            <div className="mt-10 flex gap-2">
              <Button
                type="button"
                variant="none"
                size="none"
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="flex-1 rounded-full border border-gray-600 bg-transparent py-3 font-medium text-white transition-colors hover:bg-gray-700"
              >
                취소
              </Button>
              <Button
                type="button"
                variant="none"
                size="none"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 rounded-full bg-[#1AE166] py-3 font-medium text-black transition-colors hover:bg-[#00c94c]"
              >
                {isDeleting ? '삭제 중...' : '네, 삭제할래요'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StepSelectPost;
