'use client';

import Image from 'next/image';
import postFavoriteClub from '../api/postFavoriteClub';

interface ClubDetailHeaderControlProps {
  instagramLink: string;
  clubId: number;
}
function ClubDetailHeaderControl({
  instagramLink,
  clubId,
}: ClubDetailHeaderControlProps) {
  const handleFavorite = async () => {
    // 토큰 검증 로직 추가하기

    try {
      const res = await postFavoriteClub(clubId); // 토큰 추가하기
      console.log('즐겨찾기 성공:', res);
    } catch (err) {
      console.error('즐겨찾기 실패:', err);
      alert('즐겨찾기 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="mt-5 mb-10 flex flex-row items-center gap-3.5">
      <button
        className="cursor-pointer rounded-full border-1 border-black p-2"
        onClick={handleFavorite}
      >
        <Image
          src="/detail/favoriteIcon.svg"
          alt="즐겨찾기"
          width={17}
          height={17}
        />
      </button>
      <button
        className="cursor-pointer rounded-full border-1 border-black p-1"
        onClick={() => window.open(instagramLink, '_blank')}
      >
        <Image
          src="/detail/instaIcon.svg"
          alt="인스타그램"
          width={25}
          height={25}
        />
      </button>
    </div>
  );
}

export default ClubDetailHeaderControl;
