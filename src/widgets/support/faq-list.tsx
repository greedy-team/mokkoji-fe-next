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
    question: '정인준/가인준 동아리가 무엇인가요?',
    answerTitle:
      '정인준, 가인준, 중앙동아리는 단과대·학과 동아리나 소모임과 달리 총동아리연합회 소속으로, 학교의 공식 인증을 받아 활동하는 동아리입니다.',
    answerBody:
      '• 가인준 동아리\n총동연 소속으로 활동을 시작한 단계의 동아리입니다.\n약 1년간의 활동 후 내부 심사를 통과하면 정인준 동아리로 승격됩니다.\n\n• 정인준 동아리\n운영 및 활동이 안정적으로 이루어지고 있다고 인정된 동아리입니다.\n1년 활동 후 내부 심사 통과 및 대표자회의 의결을 거치면 중앙동아리로 승격될 수 있습니다.\n\n• 중앙동아리\n학교의 공식 지원을 받는 동아리로,\n동아리방 배정, 지원금 지급 등 다양한 혜택이 제공됩니다.',
  },
  {
    question: '동아리 모집 기간에 대한 알림을 받을 수 있나요?',
    answerTitle:
      '즐겨찾기한 동아리는 모집 시작일 / 마감 3일 전 / 마감 당일 총 3번 메일 알림이 발송됩니다.',
    answerBody:
      '메일 알림을 받기 위해서는 이메일 등록이 필요합니다.\n\n[이메일 등록 방법]\n상단 프로필 로고 → 마이페이지 → 이메일 수정하기\n\n원하지 않을 경우 언제든지 이메일 알림을 OFF로 변경하실 수 있어요 :)',
  },
  {
    question: '동아리 관리 권한을 얻으려면 어떻게 해야하나요?',
    answerTitle: '동아리 관리 권한을 얻기 위해선 운영자의 승인이 필요합니다.',
    answerBody:
      '1. [구글폼](https://docs.google.com/forms/d/e/1FAIpQLSdYOTZnswSrOIkqXGrqSurvQJgNyeBFVf_CjvyYGetgfq3o7g/viewform?usp=header)을 통해 동아리장 권한을 요청합니다.\n2. 승인이 완료되면 안내 메일이 발송됩니다.\n3. 안내 메일 확인 후 모꼬지에 로그인하면 관리자 페이지 이용이 가능합니다.',
  },
  {
    question: '동아리장을 설정/변경하고 싶어요.',
    answerTitle: '동아리장 변경을 위해선 구글폼을 통해 요청해주셔야 합니다.',
    answerBody:
      '1. [구글폼](https://docs.google.com/forms/d/e/1FAIpQLSdYOTZnswSrOIkqXGrqSurvQJgNyeBFVf_CjvyYGetgfq3o7g/viewform?usp=header)을 통해 동아리장 권한을 요청합니다.\n&emsp;[필수 입력 항목]\n&emsp;1. 동아리명\n&emsp;2. 새로 지정할 동아리장 학번\n&emsp;3. 기존 동아리장 학번 (동아리장 변경 시에만 작성)\n\n2. 설정이 완료되면 안내 메일이 발송됩니다.\n3. 안내 메일 확인 후 모꼬지에 로그인하면 관리자가 자동으로 위임됩니다.',
  },
  {
    question: '동아리를 등록하고 싶어요.',
    answerTitle: '동아리 등록을 위해선 구글폼을 통해 요청해주셔야 합니다.',
    answerBody:
      '1. [구글폼](https://docs.google.com/forms/d/e/1FAIpQLSdYOTZnswSrOIkqXGrqSurvQJgNyeBFVf_CjvyYGetgfq3o7g/viewform?usp=header)을 통해 새 동아리 등록을 요청합니다.\n2. 설정이 완료되면 안내 메일이 발송됩니다.',
  },
  {
    question: '동아리 정보를 수정하고 싶어요.',
    answerTitle:
      '동아리장이 [동아리 관리]를 통해 동아리 정보를 수정할 수 있어요.',
    answerBody:
      '(🔔 동아리장 권한이 필요합니다.)\n\n[동아리 정보 수정 방법]\n1. 로그인 후 동아리 관리(상단 메뉴)를 클릭하세요.\n2. 아래의 경로로 동아리 정보를 변경합니다.\n소개글 수정 클릭 → 소개글 제출',
  },
  {
    question: '동아리 모집글을 올리고 싶어요.',
    answerTitle:
      '동아리장이 [동아리 관리]를 통해 동아리 모집글을 등록할 수 있어요.',
    answerBody:
      '(🔔 동아리장 권한이 필요합니다.)\n\n[동아리 모집글 등록 방법]\n1. 로그인 후 동아리 관리(상단 메뉴)를 클릭하세요.\n2. 아래의 경로로 모집글을 등록합니다.\n모집글 생성 클릭 → 모집글 제출\n\n[동아리 모집글 수정/삭제 방법]\n1. 로그인 후 동아리 관리(상단 메뉴)를 클릭하세요.\n2. 아래의 경로로 모집글을 변경합니다.\n모집글 수정 및 삭제 클릭 → 해당 모집글 선택 → 모집글 제출',
  },
  {
    question:
      '안내 메일을 받았는데도 권한이 반영되지 않아요. 어떻게 해야 하나요?',
    answerTitle: '권한이 부여된 후 로그인 해야합니다!',
    answerBody:
      '로그아웃 후 다시 로그인해 시도해보세요.\n그래도 반영되지 않았다면 [구글폼](https://docs.google.com/forms/d/e/1FAIpQLSdYOTZnswSrOIkqXGrqSurvQJgNyeBFVf_CjvyYGetgfq3o7g/viewform?usp=header)으로 편하게 알려주세요 :)',
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
            <>
              <p className="lg:text-md mt-5 text-sm leading-relaxed font-medium whitespace-pre-line text-[000000]">
                <span className="font-bold">A. </span>
                {item.answerTitle}
              </p>
              <p
                className="mt-5 px-4 text-sm leading-relaxed font-medium whitespace-pre-line text-[000000] lg:px-6"
                dangerouslySetInnerHTML={formatTextWithLinks(item.answerBody)}
              />
            </>
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
