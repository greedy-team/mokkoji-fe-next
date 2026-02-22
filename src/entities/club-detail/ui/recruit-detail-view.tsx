'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import convertLinkText from '@/entities/club-detail/util/convetLinkText';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

interface RecruitDetailViewProps {
  title: string;
  content: string;
  recruitForm: string;
  imageUrls: string[];
  recentRid: number;
}

function RecruitDetailView({
  title,
  content,
  recruitForm,
  imageUrls,
  recentRid,
}: RecruitDetailViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const currentRid = Number(searchParams.get('rid'));
  const isRecentRecruitment = currentRid === recentRid;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const isRecruitPeriod =
    Boolean(title?.trim()) ||
    Boolean(content?.trim()) ||
    Boolean(recruitForm?.trim()) ||
    imageUrls.length > 0;

  if (!isRecruitPeriod) {
    return (
      <p className="py-30 text-center text-gray-500">
        동아리 모집 기간이 아닙니다.
      </p>
    );
  }

  const goLatest = () => {
    const clubId = params.id;
    router.push(`/club/${clubId}`);
  };

  return (
    <div className="flex flex-col">
      {!isRecentRecruitment && (
        <button
          onClick={goLatest}
          className="text-primary-500 border-primary-500 -mt-5 mb-10 ml-auto flex cursor-pointer items-center gap-3 border-b text-sm"
        >
          <Image src="/detail/speaker.svg" alt="알림" width={16} height={16} />
          <span>최신 모집 공고 바로가기</span>
          <Image src="/detail/link.svg" alt="링크" width={16} height={16} />
        </button>
      )}
      <h1 className="lg:text-md lg:mb-5 lg:text-lg lg:font-bold">[{title}]</h1>
      <p
        dangerouslySetInnerHTML={{ __html: convertLinkText(content) }}
        className="text-text-secondary overflow-wrap-break-word mb-3 text-sm leading-[1.4] break-all whitespace-pre-wrap lg:max-w-4xl lg:text-lg"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-6">
        {imageUrls.map((imgsrc, idx) => (
          <Dialog
            key={imgsrc}
            onOpenChange={(open) => open && setCurrentIndex(idx)}
          >
            <DialogTrigger asChild>
              <div className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-md border">
                <Image
                  src={imgsrc}
                  alt="동아리 이미지"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </DialogTrigger>

            <DialogTitle className="sr-only">이미지 크게 보기</DialogTitle>
            <DialogContent
              className="fixed flex h-[80vh] w-[900px] items-center justify-center border-0 bg-transparent p-0 shadow-none"
              showCloseButton={false}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  handlePrev();
                }
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  handleNext();
                }
              }}
            >
              <div className="relative">
                <Image
                  src={imageUrls[currentIndex]}
                  alt="동아리 이미지 크게 보기"
                  width={800}
                  height={800}
                  className="object-cover"
                />

                <Button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/70 px-3 py-2 text-xl text-black hover:bg-white"
                >
                  ‹
                </Button>

                <Button
                  onClick={handleNext}
                  className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/70 px-3 py-2 text-xl text-black hover:bg-white"
                >
                  ›
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}

export default RecruitDetailView;
