'use server';

import api from '@/shared/api/auth-api';

async function rejectClubMasterApplication(
  applicationId: number,
  rejectReason?: string,
): Promise<boolean> {
  try {
    await api.post(`admin/club-master-applications/${applicationId}/reject`, {
      json: { rejectReason },
    });
    return true;
  } catch {
    return false;
  }
}

export default rejectClubMasterApplication;
