import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface NavigateRecruitFormProps {
  recruitForm: string;
}

function NavigateRecruitForm({ recruitForm }: NavigateRecruitFormProps) {
  if (!recruitForm) return null;
  return (
    <Button
      asChild
      variant="none"
      size="navi"
      className="mb-21 flex h-[120px] w-[120px] scale-60 cursor-pointer flex-col items-center gap-1.5 rounded-full bg-gradient-to-r from-[#4AF38A] to-[#32E2D0] px-8 text-center text-[17px] text-black transition hover:brightness-105 lg:mb-0 lg:scale-100"
    >
      <Link
        href={recruitForm}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-2"
      >
        <div className="flex flex-col">
          <span className="font-extrabold">동아리</span>
          <span className="font-semibold">지원하기</span>
        </div>
      </Link>
    </Button>
  );
}

export default NavigateRecruitForm;
