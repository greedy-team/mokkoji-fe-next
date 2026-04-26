'use client';

import { useState } from 'react';
import useScrollUp from '@/shared/model/useScrollUp';

function FeedbackModal() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const { isVisible } = useScrollUp();
  const [isOpen, setIsOpen] = useState(true);

  const content = (
    <div className="border-gray2 relative w-full rounded-xl border bg-white p-6">
      <button
        className="absolute top-5 right-5 text-sm text-[#474747]"
        aria-label="닫기"
        onClick={() => setIsOpen(false)}
      >
        ✕
      </button>

      <h2 className="mb-1 pr-6 text-lg font-semibold text-[#474747]">
        모꼬지 사용 경험이 궁금해요!
      </h2>
      <p className="mb-4 text-sm text-[#474747]">자유롭게 의견을 남겨주세요.</p>

      <div className="mb-4 flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
            className="text-3xl transition-transform hover:scale-110 active:scale-95"
            aria-label={`${star}점`}
          >
            <span
              className={
                star <= (hovered || rating)
                  ? 'text-lightmode-tag'
                  : 'text-gray-300'
              }
            >
              ★
            </span>
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="입력해주세요."
        className="mb-2 h-14 w-full resize-none rounded-lg bg-[#F4F4F4] px-2.5 py-1.5 text-sm text-[#474747] placeholder-gray-400 focus:outline-none"
      />

      <button
        disabled={rating === 0 && comment.length <= 0}
        className="bg-lightmode-tag w-full cursor-pointer rounded-lg py-3 text-sm transition-colors disabled:bg-gray-200 disabled:text-gray-400"
      >
        확인
      </button>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div className="mt-5 flex w-full flex-col items-center justify-center sm:hidden">
          {content}
        </div>
      )}
      {isOpen && isVisible && (
        <div className="fixed right-23 bottom-25 z-50 hidden w-85 sm:block">
          {content}
        </div>
      )}
    </>
  );
}

export default FeedbackModal;
