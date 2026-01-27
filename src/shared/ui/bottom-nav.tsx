'use client';

import NavBottomButton from './nav-bottom-button';
import {
  HomeIcon,
  ClubIcon,
  FavoriteIcon,
  FaqIcon,
  MypageIcon,
} from './icons/bottom-nav-icons';

function BottomNav() {
  return (
    <nav className="sticky inset-x-0 bottom-0 z-50 flex h-[85px] shrink-0 border-2 bg-white lg:hidden">
      <NavBottomButton label="홈" href="/" icon={HomeIcon} />
      <NavBottomButton label="전체 동아리" href="/club" icon={ClubIcon} />
      <NavBottomButton
        label="즐겨찾기"
        href="/favorite?page=1&size=6"
        icon={FavoriteIcon}
      />
      <NavBottomButton label="고객센터" href="/support" icon={FaqIcon} />
      <NavBottomButton label="마이페이지" href="/my" icon={MypageIcon} />
    </nav>
  );
}

export default BottomNav;
