'use client';

import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import throttle from 'lodash/throttle';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from '@/shared/lib/session-context';
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
  const { session } = useSession();
  const queryClient = useQueryClient();

  const handleToggle = useMemo(
    () =>
      throttle(async () => {
        if (!session) {
          toast.error('로그인 후 이용하실 수 있습니다.');
          return;
        }
        const result = favorite
          ? await deleteFavorite(clubId)
          : await postFavorite(clubId);
        if (!result.ok) {
          toast.error(result.message);
          return;
        }
        setFavorite((prev) => !prev);
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
      }, 1000),
    [favorite, session, clubId, queryClient],
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
