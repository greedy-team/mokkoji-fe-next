'use client';

import convertLinkText from '@/entities/recruit-detail/util/convetLinkText';
import cn from '@/shared/lib/utils';
import { ClubDetailType } from '@/views/club/model/type';
import { RecruitmentDetail } from '@/views/recruit/model/type';
import { CommentsResponse } from '@/widgets/club-detail/api/getClubDetailComments';
import ClubDetailCommentWidget from '@/widgets/club-detail/ui/club-detail-comment-widget';
import RecruitDetailWidget from '@/widgets/recruit-detail/ui/recruit-detail-widget';
import { useState } from 'react';

interface ClubDetailMergeProps {
  isManageClub?: boolean;
  data: RecruitmentDetail;
  clubId: number;
  clubData: ClubDetailType;
  commentData: CommentsResponse;
}

function ClubDetailMergeWidget({
  isManageClub,
  data,
  clubId,
  clubData,
  commentData,
}: ClubDetailMergeProps) {
  const [menu, setMenu] = useState('intro');

  return (
    <>
      <div className="relative my-6 flex w-full border-b border-gray-200">
        <button
          className={cn(
            'flex-1 py-3 text-center font-bold transition-colors',
            menu === 'intro'
              ? 'text-[#00E457]'
              : 'text-gray-500 hover:text-[#00E457]',
          )}
          onClick={() => setMenu('intro')}
        >
          동아리 소개
        </button>
        <button
          className={cn(
            'flex-1 py-3 text-center font-bold transition-colors',
            menu === 'recruit'
              ? 'text-[#00E457]'
              : 'text-gray-500 hover:text-[#00E457]',
          )}
          onClick={() => setMenu('recruit')}
        >
          모집 공고
        </button>
        <span
          className={cn(
            'absolute bottom-0 h-[2px] w-1/2 bg-[#00E457] transition-transform duration-300 ease-in-out',
            menu === 'intro' ? 'translate-x-0' : 'translate-x-full',
          )}
        />
      </div>
      {menu === 'intro' ? (
        <>
          <p className="mb-3 text-sm leading-[1.4] break-all whitespace-pre-wrap text-black lg:pt-10 lg:text-lg">
            <span
              dangerouslySetInnerHTML={{
                __html: convertLinkText(clubData.description),
              }}
            />
          </p>
          <ClubDetailCommentWidget clubId={clubId} commentData={commentData} />
        </>
      ) : (
        <RecruitDetailWidget
          isManageClub={isManageClub}
          title={data.title}
          clubName={data.clubName}
          category={data.category}
          content={data.content}
          recruitForm={data.recruitForm}
          imageUrls={data.imageUrls}
          recruitStart={data.recruitStart}
          recruitEnd={data.recruitEnd}
          clubId={clubId}
        />
      )}
    </>
  );
}

export default ClubDetailMergeWidget;
