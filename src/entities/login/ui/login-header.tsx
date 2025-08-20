'use client';

import { Button } from '@/shared/ui/button';
import { useState } from 'react';

interface LoginHeaderProps {
  confirmed: boolean;
  onConfirm: (confirmed: boolean) => void;
}

function LoginHeader({ confirmed, onConfirm }: LoginHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative flex cursor-default flex-col">
      <div className="flex flex-row justify-between gap-2">
        <h1 className="mb-2.5 text-[20px] font-bold">로그인</h1>

        <button
          onClick={() => setOpen(true)}
          className="w-fit cursor-pointer rounded px-1 text-sm font-medium underline hover:text-[#00E457]"
        >
          안내사항
        </button>

        {open && (
          <div
            onMouseLeave={() => setOpen(false)}
            className="absolute z-50 w-full rounded-lg border bg-white px-5 py-7 text-xs shadow-xl"

          >
            <h3 className="mb-2 font-semibold">로그인 안내</h3>
            <ul className="list-disc space-y-2 pl-5 text-xs leading-relaxed">
              <li>
                1. 로그인을 위해선{' '}
                <a
                  href="https://portal.sejong.ac.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00E457] underline"
                >
                  세종대학교포털
                </a>{' '}
                사이트에서 개인정보수집 동의가 되어있어야 합니다.
              </li>
              <li>
                2. 로그인 시{' '}
                <a
                  href="http://classic.sejong.ac.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00E457] underline"
                >
                  대양휴머니티칼리지
                </a>{' '}
                사이트에서 학생 기본 정보를 불러옵니다. (학번, 학과, 이름, 학년)
              </li>
              <li>
                3. 사용자의 세종대학교 포털 사이트의 비밀번호는{' '}
                <strong>저장되지 않습니다.</strong>
              </li>
              <li>
                4. 즐겨찾기한 동아리의 모집공고 알림을 위해 이메일을 수집할 수
                있습니다.
              </li>
            </ul>

            <div className="mt-3 flex items-center gap-2">
              <input
                id="confirm"
                type="checkbox"
                checked={confirmed}
                onChange={(e) => onConfirm(e.target.checked)}
              />
              <label htmlFor="confirm" className="text-xs">
                안내사항 확인 후에 로그인이 가능합니다.
              </label>
            </div>

            <Button
              onClick={() => setOpen(false)}
              variant="submit"
              className="mt-3 w-full rounded bg-[#00E457] px-3 py-1 text-xs font-medium text-white"
            >
              닫기
            </Button>
          </div>
        )}
      </div>

      <p className="text-[18px] font-medium">
        우리 학교 모든 동아리를 한 곳에서!
      </p>
      <p className="text-xs text-[#00E457]">안내사항을 꼭 확인해주세요!</p>
    </header>
  );
}

export default LoginHeader;
