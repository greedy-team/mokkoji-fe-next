'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import FavoriteThread from './favorite-thread';
import postFavorite from '../api/post-favorite';
import deleteFavorite from '../api/delete-favorite';

interface FavoriteButtonProps {
  isFavorite: boolean;
  clubId: string;
  customClass?: string;
}

function FavoriteButton({
  isFavorite,
  clubId,
  customClass,
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const { data: session, status } = useSession();

  const handleToggle = async () => {
    if (status !== 'authenticated' || !session) {
      toast.dismiss();
      toast.error('로그인 후 이용하실 수 있습니다 .');
      return;
    }
    try {
      if (!favorite) {
        await postFavorite(Number(clubId));
      } else {
        await deleteFavorite(Number(clubId));
      }
      setFavorite((prev: boolean) => !prev);
    } catch (error) {
      console.error('즐겨찾기 요청 실패:', error);
    }
  };

  return (
    <FavoriteThread
      favorite={favorite}
      setFavoriteAction={handleToggle}
      customClass={customClass}
    />
  );
}

export default FavoriteButton;
