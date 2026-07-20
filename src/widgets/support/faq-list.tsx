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
    question: '동아리장을 설정/변경하고 싶어요.',
    answerTitle:
      '등록된 동아리장이 없는 경우 [동아리/동아리장 신청하기] 버튼을 통해 신청할 수 있고, 등록된 동아리장이 있는 경우 [마이페이지]에서 위임할 수 있어요.',
    answerBody:
      '[동아리장 신청 방법] - 등록된 동아리장이 없는 경우\n1. FAQ 상단의 ‘동아리/동아리장 신청하기’ 버튼을 클릭하세요.\n2. 동아리장 등록 탭에서 필요한 정보를 입력 후 제출하면 검토 후 권한이 부여됩니다. \n\n (🔔 동아리장 권한이 필요합니다.)\n[동아리장 위임 방법] - 등록된 동아리장이 있는 경우\n1. 로그인 후 마이페이지에서 ‘동아리 위임하기’ 버튼을 클릭하세요.\n2. 위임하고자 하는 사용자의 권한 위임 코드를 입력하세요.\n3. 마지막으로 권한 위임하기 버튼을 클릭하면 자동으로 위임됩니다.\n\n ',
  },
  {
    question: '동아리장 권한 위임 코드를 확인하고 싶어요.',
    answerTitle: '마이페이지에서 확인 가능합니다.',
    answerBody:
      '1. 마이페이지 하단에서 권한 위임 코드를 확인할 수 있습니다.\n2. 우측의 복사버튼을 통해 바로 복사 가능합니다.',
  },
  {
    question: '동아리를 등록하고 싶어요.',
    answerTitle:
      'FAQ 상단의 [동아리/동아리장 신청하기] 버튼을 통해 신청할 수 있어요.',
    answerBody:
      '[동아리 등록 방법]\n1. ‘동아리/동아리장 신청하기’ 버튼을 클릭합니다.\n2. 동아리 생성 탭에서  필요한 정보를 입력 후 제출하합니다.\n 3. 제출 후 마이페이지에서 대기, 승인, 거부 현황 확인이 가능합니다. ',
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
    question: 'FAQ에 없는 질문들이 있어요.',
    answerTitle: '아래 구글폼으로 편하게 알려주세요 :)',
    answerBody:
      '[구글폼](https://docs.google.com/forms/d/e/1FAIpQLSdYOTZnswSrOIkqXGrqSurvQJgNyeBFVf_CjvyYGetgfq3o7g/viewform?usp=header)',
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
    <div className="mt-8 w-full space-y-6">
      <h1 className="text-primary-500 text-xl font-bold lg:text-3xl">FAQ</h1>
      {faqData.map((item, idx) => (
        <div key={item.question} className="border-b pb-3 lg:pb-5">
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
    </div>
  );
}

export default FAQList;
