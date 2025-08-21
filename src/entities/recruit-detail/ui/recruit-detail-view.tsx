'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/shared/ui/dialog';
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
  return (
    <div className="flex flex-col gap-4">
      {/* 모집폼 */}
      <div className="mt-5 mb-5 text-sm font-bold lg:text-lg">
        동아리 지원하러 가기: <br />
        <a
          href={recruitForm}
          className="text-sm text-[#00E457] hover:underline lg:text-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          {recruitForm}
        </a>
      </div>

      {/* 제목 */}
      <h4 className="text-md mb-5 font-bold lg:text-lg">[{title}]</h4>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {imageUrls.map((imgsrc) => (
          <Dialog key={imgsrc}>
            <DialogTrigger asChild>
              <div className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-md border">
                <Image
                  src={imgsrc}
                  alt="동아리 이미지"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* 오버레이 효과 */}
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </DialogTrigger>
            <DialogTitle className="sr-only">이미지 크게 보기</DialogTitle>
            <DialogContent
              className="max-w-6xl border-0 bg-transparent p-0 shadow-none focus:outline-none"
              showCloseButton={false}
            >
              <div className="relative h-[80vh] w-full">
                <Image
                  src={imgsrc}
                  alt="동아리 이미지 크게 보기"
                  fill
                  className="object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      {/* 본문 */}
      <p
        dangerouslySetInnerHTML={{ __html: convertLinkText(content) }}
        className="mb-3 max-w-4xl text-sm leading-[1.4] whitespace-pre-wrap text-black lg:text-lg"
      />
    </div>
  );
}

export default RecruitDetailView;
