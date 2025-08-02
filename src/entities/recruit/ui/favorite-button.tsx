'use client';

import { useState, startTransition } from 'react';
import serverApi from '@/shared/api/server-api';
import { useSession } from 'next-auth/react';
import FavoriteThread from './favorite-thread';

interface FavoriteButtonProps {
  isFavorite: boolean;
  clubId: string;
}

function FavoriteButton({ isFavorite, clubId }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const { data: session, status } = useSession();

  const handleToggle = async () => {
    if (status !== 'authenticated') return;
    try {
      const headers = {
        Authorization: `Bearer ${session?.accessToken}`,
      };

      if (!favorite) {
        await serverApi.post(`favorites/${clubId}`, { headers });
      } else {
        await serverApi.delete(`favorites/${clubId}`, { headers });
      }
    } catch (error) {
      console.error('즐겨찾기 요청 실패:', error);
    }

    startTransition(async () => {
      setFavorite((prev: boolean) => !prev);
    });
  };

  return (
    <FavoriteThread favorite={favorite} setFavoriteAction={handleToggle} />
  );
}

export default FavoriteButton;
