'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from '@/shared/lib/session-context';
import FavoriteThread from '@/shared/ui/favorite-thread';
import {
  postFavoriteMutationOptions,
  deleteFavoriteMutationOptions,
} from '../api/mutations';

interface ClientFavoriteButtonProps {
  isFavorite: boolean;
  clubId: number;
  customClass?: string;
  wrapperClass?: string;
}

function ClientFavoriteButton({
  isFavorite,
  clubId,
  customClass,
  wrapperClass,
}: ClientFavoriteButtonProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const { session } = useSession();
  const queryClient = useQueryClient();

  const onSuccess = () => {
    setFavorite((prev) => !prev);
    queryClient.invalidateQueries({ queryKey: ['favorites'] });
  };

  const { mutate: addFavorite, isPending: isAdding } = useMutation({
    ...postFavoriteMutationOptions(),
    onSuccess,
  });

  const { mutate: removeFavorite, isPending: isRemoving } = useMutation({
    ...deleteFavoriteMutationOptions(),
    onSuccess,
  });

  const handleToggle = () => {
    if (!session) {
      toast.error('로그인 후 이용하실 수 있습니다.');
      return;
    }
    if (isAdding || isRemoving) return;

    if (favorite) {
      removeFavorite(clubId);
    } else {
      addFavorite(clubId);
    }
  };

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

export default ClientFavoriteButton;
