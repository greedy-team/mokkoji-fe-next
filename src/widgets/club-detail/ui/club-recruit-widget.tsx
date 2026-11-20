'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import RecruitDetailView from '@/entities/club-detail/ui/recruit-detail-view';
import NavigateRecruitForm from '@/features/club-detail/ui/navigate-recruit-form';
import postApplyClick from '@/features/club-detail/api/postApplyClick';
import shouldCollectApplyClick from '@/entities/club-detail/util/shouldCollectApplyClick';
import { RecruitStatus } from '@/shared/model/type';

interface RecruitDetail {
  title: string;
  clubName: string;
  category: string;
  content: string;
  recruitForm: string;
  imageUrls: string[];
  recruitStart?: string;
  recruitEnd?: string;
  status: RecruitStatus;
}
interface ClubRecruitWidgetProps {
  selectedRecruitmentId: number;
  recruitDetail: RecruitDetail;
  historySlot?: ReactNode;
}

function ClubRecruitWidget({
  selectedRecruitmentId,
  recruitDetail,
  historySlot,
}: ClubRecruitWidgetProps) {
  const recruitHistoryRef = useRef<HTMLDivElement>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const section = recruitHistoryRef.current;
    if (!section) return () => {};

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);

        if (entry.isIntersecting) {
          setVisible(false);
          fadeTimeoutRef.current = setTimeout(() => setMounted(false), 150);
        } else {
          setMounted(true);
          setVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, []);

  // 응답을 기다리면 새 탭 열림이 늦어지므로 await하지 않는다.
  const handleApplyFormLinkClick = () => {
    const { recruitForm, status } = recruitDetail;
    if (!shouldCollectApplyClick({ recruitForm, recruitStatus: status })) {
      return;
    }
    postApplyClick(selectedRecruitmentId);
  };

  return (
    <div className="relative">
      <RecruitDetailView
        title={recruitDetail.title}
        content={recruitDetail.content}
        recruitForm={recruitDetail.recruitForm}
        imageUrls={recruitDetail.imageUrls}
        recentRecruitId={selectedRecruitmentId}
        onApplyFormLinkClick={handleApplyFormLinkClick}
      />
      <div ref={recruitHistoryRef}>{historySlot}</div>
      {mounted && (
        <div
          className="fixed right-2 bottom-5 z-50 transition-opacity duration-150 lg:right-[calc((100vw-60vw)/2+24px)] lg:bottom-14"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <NavigateRecruitForm
            recruitmentId={selectedRecruitmentId}
            recruitForm={recruitDetail.recruitForm}
            recruitStatus={recruitDetail.status}
          />
        </div>
      )}
    </div>
  );
}

export default ClubRecruitWidget;
