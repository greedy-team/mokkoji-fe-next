'use client';

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
  {
    question: '커뮤니티 게시글은 누구나 작성할 수 있나요?',
    answer:
      '커뮤니티 게시글은 로그인한 사용자라면 누구나 자유롭게 작성하실 수 있습니다. 단, 게시판 성격에 따라 일부 제한이 있을 수 있으며, 운영 정책에 따라 관리될 수 있습니다.',
  },
];

function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="flex w-[85%] flex-col lg:w-[43%]">
      <section className="mt-8 mb-4">
        <h2 className="text-xl font-bold text-[#20E86C] lg:text-2xl">
          자주 묻는 질문
        </h2>
      </section>
      <section className="space-y-3">
        {faqData.map((item, idx) => (
          <div
            key={item.question}
            className="cursor-pointer rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
          >
            <button
              className="w-full text-left text-base font-semibold transition hover:text-[#20E86C] lg:text-lg"
              onClick={() => toggle(idx)}
            >
              <span className="flex items-start gap-2">
                <span className="font-bold text-[#20E86C]">Q.</span>
                <span className="text-left">{item.question}</span>
              </span>
            </button>
            {openIndex === idx && item.answer && (
              <div className="mt-4">
                <p className="text-sm leading-relaxed text-gray-600 lg:text-base">
                  <span className="font-bold text-[#20E86C]">A. </span>
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}

export default FAQList;
