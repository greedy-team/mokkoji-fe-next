import ky from 'ky';

async function deleteClub(clubId: number): Promise<void> {
  await ky.delete(`/api/admin/clubs/${clubId}`);
}

export default deleteClub;
