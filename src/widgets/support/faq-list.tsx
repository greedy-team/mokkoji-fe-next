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
    question: '동아리를 등록하고 싶어요.',
    answerTitle:
      '아래의 구글폼을 통해 요청해주시면 됩니다. 빠른 시일 내에 동아리를 등록을 도와드리겠습니다.',
    answerBody:
      '[필수 입력 정보]\n1. 동아리명\n2. 소개\n3. 동아리장 학번\n4. 카테고리 (중앙동아리 / 정인준 · 가인준 동아리 / 기타동아리\n5. 동아리 소속 (문화/예술, 학술/교양, 봉사/사회, 체육, 종교, 기타)\n\n[선택 입력 정보]\n1. 동아리 로고\n2. 인스타그램 주소',
  },
  {
    question: '동아리 모집글을 올리고 싶어요.',
    answerTitle:
      '동아리 모집글은 동아리장으로 등록된 사용자가 직접 업로드 가능합니다.',
    answerBody:
      '[동아리 모집글 작성 방법]\n(🔔 이미 동아리장 권한이 있다면 1~2단계는 건너뛰셔도 됩니다.)\n1. 모꼬지 사이트에 로그인합니다.\n   → 로그인 후 권한 요청을 해주셔야 권한이 부여됩니다.\n2. 아래의 구글폼으로 동아리장 권한을 요청합니다.\n3. 권한이 승인되면, 로그인 후 배너의 [모집공고 작성] 버튼을 클릭합니다.\n4. 모집글을 올릴 동아리를 선택한 후 모집글을 작성하고 완료 버튼을 누릅니다.\n\n만약 업로드 과정에서 오류가 발생한다면, 아래 구글폼을 통해 요청해주세요 : )',
  },
  {
    question: '동아리 정보를 수정하고 싶어요.',
    answerTitle:
      '동아리 정보는 동아리장으로 등록된 사용자가 직접 수정할 수 있습니다.',
    answerBody:
      '[동아리 정보 수정 방법]\n(🔔 이미 동아리장 권한이 있다면 1~2단계는 건너뛰셔도 됩니다.)\n1. 모꼬지 사이트에 로그인합니다.\n   → 로그인 후 권한 요청을 해주셔야 권한이 부여됩니다.\n2. 아래의 구글폼으로 동아리장 권한을 요청합니다.\n3. 권한이 승인되면, 로그인 후 배너의 [동아리 정보 수정] 또는 [모집공고 작성] 버튼을 클릭합니다.\n4. 수정할 동아리를 선택한 후 필요한 내용을 수정하고, 완료 버튼을 누릅니다.\n\n만약 수정하는 과정에서 오류가 발생한다면, 아래 구글폼을 통해 요청해주세요 : )',
  },
  {
    question: '동아리 모집글을 수정 및 삭제하고 싶어요.',
    answerTitle:
      '동아리 모집글은 동아리장으로 등록된 사용자가 직접 수정할 수 있습니다.',
    answerBody:
      '[동아리 모집글 수정 및 삭제 방법]\n(🔔 이미 동아리장 권한이 있다면 1~2단계는 건너뛰셔도 됩니다.)\n1. 모꼬지 사이트에 로그인합니다.\n   → 로그인 후 권한 요청을 해주셔야 권한이 부여됩니다.\n2. 아래의 구글폼으로 동아리장 권한을 요청합니다.\n3. 권한이 승인되면, 수정할 동아리 모집글을 클릭합니다.\n4. 상단의 [수정하기] 또는 [삭제하기] 버튼을 눌러 변경합니다.\n\n만약 수정/삭제하는 과정에서 오류가 발생한다면, 아래 구글폼을 통해 요청해주세요 : )',
  },
  {
    question: '동아리 모집 기간을 상시로 설정하고 싶어요.',
    answerTitle: '상시 모집 기능은 추후 업데이트될 예정입니다.',
    answerBody:
      '상시 모집을 원하시는 경우, 잠시 모집 기간을 넉넉하게 설정해주시면 감사하겠습니다 : )',
  },
  {
    question: '동아리장을 여러명으로 설정하고 싶어요.',
    answerTitle: '현재 시스템에서는 동아리장을 한 명만 설정할 수 있습니다.',
    answerBody:
      '이는 동아리 대표성을 명확히 하고, 운영 책임을 일관되게 하기 위함입니다.',
  },
  {
    question: '동아리장을 설정/변경하고 싶어요.',
    answerTitle:
      '아래의 구글폼을 통해 요청해주시면 됩니다. 빠른 시일 내에 권한을 승인해드리겠습니다.',
    answerBody:
      '[필수 입력 항목]\n1. 동아리명\n2. 변경할 동아리장 학번\n3. 기존 동아리장 학번(동아리장 변경 시에만 작성)',
  },
];

function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  function formatTextWithLinks(text: string) {
    const textWithBreaks = text.replace(/\n/g, '<br />');

    const formattedText = textWithBreaks.replace(
      /(https?:\/\/[^\s]+)/g,
      (url) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">${url}</a>`,
    );

    return { __html: formattedText };
  }

  return (
    <div className="mt-10 w-full space-y-6">
      <h2 className="text-2xl font-bold text-[#20E86C]">FAQ</h2>
      {faqData.map((item, idx) => (
        <div key={item.question} className="border-b pb-4">
          <button
            className={cn(
              'w-full cursor-pointer text-left text-lg font-semibold transition hover:text-[#20E86C]',
              openIndex === idx ? 'text-[#20E86C]' : 'text-black',
            )}
            onClick={() => toggle(idx)}
          >
            <span>Q. {item.question}</span>
          </button>
          {openIndex === idx && item.answerTitle && item.answerBody && (
            <div className="px-3">
              <p className="text-md mt-5 leading-relaxed font-semibold whitespace-pre-line text-[000000]">
                <span className="font-bold">A. </span>
                {item.answerTitle}
              </p>
              <p
                className="mt-5 text-sm leading-relaxed font-medium whitespace-pre-line text-[000000]"
                dangerouslySetInnerHTML={formatTextWithLinks(item.answerBody)}
              />
            </div>
          )}
        </div>
      ))}

      <span className="text-xl font-bold text-[#20E86C] underline">
        <a
          id="bottom"
          href="https://docs.google.com/forms/d/1U3tnUQxdu8CtT9W1b8KQoQkhFs851BiwSO3l355L57w/viewform?edit_requested=true"
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
