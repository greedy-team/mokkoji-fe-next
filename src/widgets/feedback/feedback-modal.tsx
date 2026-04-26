'use client';

import { useState } from 'react';

function FeedbackModal() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <div className="mt-5 flex w-full flex-col items-center justify-center">
      <div className="border-gray2 relative w-full rounded-xl border bg-white p-6">
        <button
          className="absolute top-5 right-5 text-sm text-[#474747]"
          aria-label="닫기"
        >
          ✕
        </button>

        <h2 className="mb-1 pr-6 text-lg font-semibold text-[#474747]">
          모꼬지 사용 경험이 궁금해요!
        </h2>
        <p className="mb-4 text-sm text-[#474747]">
          자유롭게 의견을 남겨주세요.
        </p>

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
          className="mb-2 h-14 w-full resize-none rounded-lg bg-[#F4F4F4] px-2.5 py-1.5 text-sm text-[#474747] placeholder-gray-400 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
        />

        <button
          disabled={rating === 0 && comment.length <= 0}
          className="bg-lightmode-tag w-full cursor-pointer rounded-lg py-3 text-sm transition-colors disabled:bg-gray-200 disabled:text-gray-400 sm:py-3.5 sm:text-base"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default FeedbackModal;
