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
import convertLinkText from '../util/convetLinkText';

interface RecruitDetailViewProps {
  title: string;
  content: string;
  recruitForm: string;
  imageUrls: string[];
}

function RecruitDetailView({
  title,
  content,
  recruitForm,
  imageUrls,
}: RecruitDetailViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
  };

  return (
    <div className="flex flex-col gap-4">
      {recruitForm && (
        <div className="mt-5 mb-5 text-sm font-bold lg:text-lg">
          동아리 지원하러 가기: <br />
          <a
            href={recruitForm}
            className="text-sm text-blue-600 hover:underline lg:text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            {recruitForm}
          </a>
        </div>
      )}
      <h4 className="text-md mb-5 font-bold lg:text-lg">[{title}]</h4>
      <p
        dangerouslySetInnerHTML={{ __html: convertLinkText(content) }}
        className="mb-3 max-w-4xl text-sm leading-[1.4] whitespace-pre-wrap lg:text-lg"
      />

      {/* 이미지 리스트 */}
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
