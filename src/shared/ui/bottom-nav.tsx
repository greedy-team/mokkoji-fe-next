'use client';

import useUniversityCode from '@/shared/hooks/useUniversityCode';

import NavBottomButton from './nav-bottom-button';
import {
  HomeIcon,
  ClubIcon,
  FavoriteIcon,
  FaqIcon,
  MypageIcon,
} from './icons/bottom-nav-icons';

function BottomNav() {
  const universityCode = useUniversityCode();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex h-[85px] shrink-0 border-2 bg-white lg:hidden">
      <NavBottomButton
        label="전체 동아리"
        href={`/${universityCode}/club`}
        icon={ClubIcon}
      />
      <NavBottomButton
        label="즐겨찾기"
        href={`/${universityCode}/favorite?page=1&size=6`}
        icon={FavoriteIcon}
      />
      <NavBottomButton label="홈" href={`/${universityCode}`} icon={HomeIcon} />
      <NavBottomButton
        label="고객센터"
        href={`/${universityCode}/support`}
        icon={FaqIcon}
      />
      <NavBottomButton
        label="마이페이지"
        href={`/${universityCode}/my`}
        icon={MypageIcon}
      />
    </nav>
  );
}

export default BottomNav;
