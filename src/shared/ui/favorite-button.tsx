'use client';

import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import throttle from 'lodash/throttle';
import { useSession } from 'next-auth/react';
import FavoriteThread from './favorite-thread';
import postFavorite from '../api/post-favorite';
import deleteFavorite from '../api/delete-favorite';

interface FavoriteButtonProps {
  isFavorite: boolean;
  clubId: number;
  customClass?: string;
  wrapperClass?: string;
}

function FavoriteButton({
  isFavorite,
  clubId,
  customClass,
  wrapperClass,
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const { data: session } = useSession();

  const handleToggle = useMemo(
    () =>
      throttle(async () => {
        if (!session) {
          toast.error('로그인 후 이용하실 수 있습니다.');
          return;
        }
        try {
          if (!favorite) {
            await postFavorite(Number(clubId));
          } else {
            await deleteFavorite(Number(clubId));
          }
          setFavorite((prev) => !prev);
        } catch (error) {
          console.error('즐겨찾기 요청 실패:', error);
        }
      }, 300),
    [favorite, session, clubId],
  );
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) return;
        handleToggle();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      }}
      className={wrapperClass}
      aria-label={favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
    >
      <FavoriteThread
        favorite={favorite}
        setFavoriteAction={handleToggle}
        customClass={customClass}
      />
    </div>
  );
}

export default FavoriteButton;
