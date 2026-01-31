import { ClubRecruitments } from '@/views/club/model/type';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import RecruitHistoryCard from './recruit-history-card';

interface RecruitHistorySectionProps {
  clubId: number;
  recruitHistories: ClubRecruitments[];
  selectedRid: number;
}

function useRecruitHistoryVisibleCardCount() {
  const [cardCount, setCardCount] = useState(3);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;

      if (width >= 1024) setCardCount(3);
      else if (width >= 640) setCardCount(2);
      else setCardCount(3);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return cardCount;
}

const MOBILE_PAGE_SIZE = 3;

function RecruitHistorySection({
  clubId,
  recruitHistories,
  selectedRid,
}: RecruitHistorySectionProps) {
  const recruitHistoryList = Array.isArray(recruitHistories)
    ? recruitHistories
    : [];

  const visibleCardCount = useRecruitHistoryVisibleCardCount();

  const [desktopIndex, setDesktopIndex] = useState(0);
  const desktopMaxIndex = Math.max(
    0,
    recruitHistoryList.length - visibleCardCount,
  );
  const canDesktopPrev = desktopIndex > 0;
  const canDesktopNext = desktopIndex < desktopMaxIndex;
  const desktopItemWidth = `${100 / visibleCardCount}%`;

  const [mobilePageIndex, setMobilePageIndex] = useState(0);
  const mobileMaxPageIndex = Math.max(
    0,
    Math.ceil(recruitHistoryList.length / MOBILE_PAGE_SIZE) - 1,
  );
  const canMobilePrev = mobilePageIndex > 0;
  const canMobileNext = mobilePageIndex < mobileMaxPageIndex;

  useEffect(() => {
    setDesktopIndex((prev) => Math.min(prev, desktopMaxIndex));
  }, [desktopMaxIndex]);

  useEffect(() => {
    setMobilePageIndex((prev) => Math.min(prev, mobileMaxPageIndex));
  }, [mobileMaxPageIndex]);

  return (
    <div className="mb-11">
      <div className="mt-8 flex items-center gap-2 lg:gap-3">
        <img src="/pin.svg" alt="pin" className="w-8" />
        <span className="font-bold lg:text-xl">전체 모집 공고</span>
      </div>

      <div className="mt-4 overflow-hidden pt-2 sm:hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${mobilePageIndex * 100}%)` }}
        >
          {Array.from({ length: mobileMaxPageIndex + 1 }).map(
            (_, pageIndex) => {
              const start = pageIndex * MOBILE_PAGE_SIZE;
              const pageItems = recruitHistoryList.slice(
                start,
                start + MOBILE_PAGE_SIZE,
              );

              const pageKey =
                pageItems[0]?.id != null
                  ? `page-${pageItems[0].id}`
                  : `page-${start}`;

              return (
                <div key={pageKey} className="w-full shrink-0">
                  <div className="m-1 grid grid-cols-1 gap-4">
                    {pageItems.map((recruitment) => {
                      const queryString = new URLSearchParams();
                      queryString.set('rid', String(recruitment.id));
                      const href = `/club/${clubId}?${queryString.toString()}`;

                      return (
                        <Link key={recruitment.id} href={href}>
                          <RecruitHistoryCard
                            recruitHistories={recruitment}
                            isSelected={selectedRid === recruitment.id}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            },
          )}
        </div>

        <div className="mt-6 flex justify-center gap-6 text-sm">
          <button
            type="button"
            onClick={() => setMobilePageIndex((v) => Math.max(0, v - 1))}
            disabled={!canMobilePrev}
            className="disabled:opacity-40"
          >
            &lt; 이전
          </button>

          <button
            type="button"
            onClick={() =>
              setMobilePageIndex((v) => Math.min(mobileMaxPageIndex, v + 1))
            }
            disabled={!canMobileNext}
            className="disabled:opacity-40"
          >
            다음 &gt;
          </button>
        </div>
      </div>

      <div className="mt-4 hidden overflow-hidden pt-2 sm:block lg:mt-5">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${desktopIndex * (100 / visibleCardCount)}%)`,
          }}
        >
          {recruitHistoryList.map((recruitment) => {
            const queryString = new URLSearchParams();
            queryString.set('rid', String(recruitment.id));
            const href = `/club/${clubId}?${queryString.toString()}`;

            return (
              <div
                key={recruitment.id}
                style={{ width: desktopItemWidth }}
                className="shrink-0 px-2"
              >
                <Link href={href}>
                  <RecruitHistoryCard
                    recruitHistories={recruitment}
                    isSelected={selectedRid === recruitment.id}
                  />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-6 text-sm">
          <button
            type="button"
            onClick={() => setDesktopIndex((v) => Math.max(0, v - 1))}
            disabled={!canDesktopPrev}
            className="disabled:opacity-40"
          >
            &lt; 이전
          </button>

          <button
            type="button"
            onClick={() =>
              setDesktopIndex((v) => Math.min(desktopMaxIndex, v + 1))
            }
            disabled={!canDesktopNext}
            className="disabled:opacity-40"
          >
            다음 &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecruitHistorySection;
