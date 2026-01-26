'use client';

import cn from '@/shared/lib/utils';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answerTitle: string;
  answerBody: string;
}

const faqData: FAQItem[] = [
  {
    question: '정인준/가인준 동아리가 뭔가요?',
    answerTitle:
      '정인준, 가인준, 중앙동아리는 단과대/학과 동아리나 소모임과 달리 총동아리연합회 소속으로 학교의 인증을 받아 활동하는 동아리입니다.',
    answerBody:
      '가인준: 총동아리연합회 소속으로 활동을 시작한 동아리로, 1년 활동 후 내부 심사를 통과하면 정인준 동아리로 승격됩니다.\n\n정인준: 내부 심사를 통해 운영 및 활동이 확인된 동아리로, 1년 활동 후 내부 심사 통과 및 대표자회의 의결을 거쳐 중앙동아리로 승격됩니다.\n\n중앙동아리: 학교 지원이 제공되는 동아리로, 동아리방 배정, 동아리 지원금 등의 혜택을 받을 수 있습니다.',
  },
  {
    question: '동아리 모집 기간에 대한 알림을 받을 수 있나요?',
    answerTitle: '즐겨찾기 해둔 동아리는 마감 3일전 메일 알림이 전송됩니다!',
    answerBody:
      '메일을 받기 위해 본인의 메일 주소를 등록해야합니다.\n\n상단 프로필 이미지 → 마이페이지 → 이메일 수정하기 → 이메일 작성 및 제출',
  },
  {
    question: '동아리 관리 권한을 얻으려면 어떻게 해야하나요?',
    answerTitle: '동아리 관리 권한을 얻기 위해선 운영자의 승인이 필요합니다.',
    answerBody:
      '1. 모꼬지 사이트에 로그인합니다.\n2. [구글폼](https://docs.google.com/forms/d/e/1FAIpQLSdYOTZnswSrOIkqXGrqSurvQJgNyeBFVf_CjvyYGetgfq3o7g/viewform?usp=header)으로 동아리장 권한을 요청합니다.',
  },
  {
    question: '동아리를 등록하고 싶어요.',
    answerTitle:
      '아래의 구글폼을 통해 요청해주시면 됩니다. 빠른 시일 내에 동아리를 등록을 도와드리겠습니다.',
    answerBody:
      '[필수 입력 정보]\n1. 동아리명\n2. 소개\n3. 동아리장 학번\n4. 카테고리 (중앙동아리 / 정인준·가인준 동아리 / 기타동아리)\n5. 동아리 소속 (문화/예술, 학술/교양, 봉사/사회, 체육, 종교, 기타)\n\n[선택 입력 정보]\n1. 동아리 로고\n2. 인스타그램 주소',
  },
  {
    question: '동아리 모집글을 올리고 싶어요.',
    answerTitle:
      '동아리 모집글은 동아리장으로 등록된 사용자가 직접 업로드 가능합니다.\n(🔔 해당 동아리장 권한이 필요합니다.)',
    answerBody:
      '[동아리 모집글 등록 방법]\n1. 상단의 [동아리 관리] 버튼을 클릭해 관리자 페이지로 이동합니다.\n2. 모집글을 올릴 동아리를 선택한 후 모집글 → 모집글 생성 → 모집글 제출\n\n[동아리 모집글 수정/삭제 방법]\n1. 상단의 [동아리 관리] 버튼을 클릭해 관리자 페이지로 이동합니다.\n2. 모집글을 올릴 동아리를 선택한 후 모집글 → 모집글 수정 → 수정/삭제하고자 하는 모집글 선택 → 모집글 제출\n\n만약 업로드 과정에서 오류가 발생하면, 하단 구글폼을 통해 요청해주세요 : )',
  },
  {
    question: '동아리 정보를 수정하고 싶어요.',
    answerTitle:
      '동아리 정보는 동아리장으로 등록된 사용자가 직접 수정할 수 있습니다.\n(🔔 해당 동아리장 권한이 필요합니다.)',
    answerBody:
      '[동아리 정보 수정 방법]\n1. 상단의 [동아리 관리] 버튼을 클릭해 관리자 페이지로 이동합니다.\n2. 정보를 수정할 동아리를 선택한 후 소개글 → 소개글 수정 → 소개글 제출\n\n만약 수정하는 과정에서 오류가 발생하면, 하단 구글폼을 통해 요청해주세요 : )',
  },
  {
    question: '동아리장을 설정/변경하고 싶어요.',
    answerTitle:
      '아래의 구글폼을 통해 요청해주시면 됩니다. 빠른 시일 내에 권한을 승인해드리겠습니다.',
    answerBody:
      '[필수 입력 항목]\n1. 동아리명\n2. 새로 지정할 동아리장 학번\n3. 기존 동아리장 학번(동아리장 변경 시에만 작성)\n\n→ 새로 지정할 동아리장은 최초 한 번은 로그인 후 권한 요청을 해주셔야 권한 부여가 가능합니다.',
  },
];

function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  function formatTextWithLinks(text: string) {
    const textWithBreaks = text.replace(/\n/g, '<br />');

    const withMarkdownLinks = textWithBreaks.replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      (_, linkText, url) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">${linkText}</a>`,
    );

    const formattedText = withMarkdownLinks.replace(
      /(?<!")(https?:\/\/[^\s<]+)/g,
      (url) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">${url}</a>`,
    );

    return { __html: formattedText };
  }

  return (
    <div className="mt-10 w-full space-y-6">
      <h2 className="text-primary-500 text-xl font-bold lg:text-2xl">FAQ</h2>
      {faqData.map((item, idx) => (
        <div key={item.question} className="border-b pb-3 lg:pb-4">
          <button
            className={cn(
              'hover:text-primary-500 w-full cursor-pointer text-left text-sm font-semibold transition lg:text-lg',
              openIndex === idx ? 'text-primary-500' : 'text-text-primary',
            )}
            onClick={() => toggle(idx)}
          >
            <span>Q. {item.question}</span>
          </button>
          {openIndex === idx && item.answerTitle && item.answerBody && (
            <div className="">
              <p className="mt-5 text-sm leading-relaxed font-semibold whitespace-pre-line text-[000000] lg:text-lg">
                <span className="font-bold">A. </span>
                {item.answerTitle}
              </p>
              <p
                className="mt-5 px-4 text-sm leading-relaxed font-medium whitespace-pre-line text-[000000] lg:px-6"
                dangerouslySetInnerHTML={formatTextWithLinks(item.answerBody)}
              />
            </div>
          )}
        </div>
      ))}

      <span className="text-sm font-bold text-[#20E86C] underline lg:text-xl">
        <a
          id="bottom"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdYOTZnswSrOIkqXGrqSurvQJgNyeBFVf_CjvyYGetgfq3o7g/viewform?usp=header"
          target="_blank"
          rel="noopener noreferrer"
        >
          구글폼 링크
        </a>
      </span>
    </div>
  );
}

export default FAQList;
