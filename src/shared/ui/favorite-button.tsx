'use client';

import { useState } from 'react';
import serverApi from '@/shared/api/server-api';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import FavoriteThread from './favorite-thread';

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
    if (status !== 'authenticated' || !session?.accessToken) {
      toast.dismiss();
      toast.error('로그인 후 이용하실 수 있습니다 .');
      return;
    }
    try {
      const headers = {
        Authorization: `Bearer ${session?.accessToken}`,
      };

      if (!favorite) {
        await serverApi.post(`favorites/${clubId}`, { headers });
      } else {
        await serverApi.delete(`favorites/${clubId}`, { headers });
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
