'use client';

import cn from '@/shared/lib/utils';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: '즐겨찾기 한 동아리의 모집 일정은 어디서 확인하나요?',
    answer:
      '즐겨찾기한 동아리의 모집 일정은 해당 동아리 상세 페이지에서 확인하실 수 있습니다. 모집 기간이 정해져 있는 경우, 공지사항이나 알림을 통해 안내해드립니다.',
  },
  {
    question: '동아리 모집이 마감됐는데, 다시 지원할 수 있나요?',
    answer:
      '대부분의 동아리는 정해진 기간 동안만 신입 회원을 모집하지만, 간혹 추가 모집이나 수시 모집을 진행하는 동아리도 있습니다. 관심 있는 동아리의 상세 페이지에서 공지사항을 확인하거나, 담당자에게 직접 문의해 보시는 것을 추천드립니다. 또한, 다음 학기 모집 일정에 맞춰 지원하실 수 있도록 웹사이트에서 사전 알림을 신청하실 수도 있습니다!',
  },
  {
    question: '동아리 정보를 잘못 등록했거나 수정하고 싶어요.',
    answer:
      '동아리 정보 수정이 필요한 경우, 관리자 페이지 또는 고객센터를 통해 요청하실 수 있습니다. 등록자 본인이 직접 수정이 불가능한 경우 운영팀에 문의해 주세요.',
  },
];

function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-10 w-full space-y-6">
      <h2 className="text-2xl font-bold text-[#20E86C]">FAQ</h2>
      {faqData.map((item, idx) => (
        <div key={item.question} className="border-b pb-4">
          <button
            className={cn(
              'w-full text-left text-sm font-semibold transition hover:text-[#20E86C]',
              openIndex === idx ? 'text-[#20E86C]' : 'text-black',
            )}
            onClick={() => toggle(idx)}
          >
            <span>Q. {item.question}</span>
          </button>
          {openIndex === idx && item.answer && (
            <p className="mt-5 max-w-[500px] text-xs leading-relaxed font-semibold whitespace-pre-line text-[000000]">
              <span className="font-bold">A. </span>
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQList;
