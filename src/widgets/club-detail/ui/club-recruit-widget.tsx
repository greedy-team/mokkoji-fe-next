'use client';

import { useEffect, useRef, useState } from 'react';
import RecruitDetailView from '@/entities/club-detail/ui/recruit-detail-view';
import RecruitHistorySection from '@/entities/club-detail/ui/recruit-history-section';
import { ClubRecruitments } from '@/entities/club-detail/model/type';
import NavigateRecruitForm from '@/features/club-detail/ui/navigate-recruit-form';
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
  clubId: number;
  recruitHistories: ClubRecruitments[];
  recruit: number;
  recruitDetail: RecruitDetail;
}

function ClubRecruitWidget({
  clubId,
  recruitHistories,
  recruit,
  recruitDetail,
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

  return (
    <div className="relative">
      <RecruitDetailView
        title={recruitDetail.title}
        content={recruitDetail.content}
        recruitForm={recruitDetail.recruitForm}
        imageUrls={recruitDetail.imageUrls}
        recentRecruitId={recruitHistories[0]?.id ?? recruit}
      />
      <div ref={recruitHistoryRef}>
        <RecruitHistorySection
          clubId={clubId}
          recruitHistories={recruitHistories}
          selectedRecruitId={recruit}
        />
      </div>
      {mounted && (
        <div
          className="fixed right-2 bottom-5 z-50 transition-opacity duration-150 lg:right-[calc((100vw-60vw)/2+24px)] lg:bottom-14"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <NavigateRecruitForm
            recruitForm={recruitDetail.recruitForm}
            recruitStatus={recruitDetail.status}
          />
        </div>
      )}
    </div>
  );
}

export default ClubRecruitWidget;
