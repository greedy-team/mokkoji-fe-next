import type { MutationOptions } from '@tanstack/react-query';
import deleteClub from '@/entities/admin/api/deleteClub';

const deleteClubMutationOptions = () =>
  ({
    mutationFn: (clubId: number) => deleteClub(clubId),
  }) satisfies MutationOptions<void, Error, number>;

export default deleteClubMutationOptions;
