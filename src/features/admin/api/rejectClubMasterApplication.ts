'use server';

import api from '@/shared/api/dashboard-api';

async function rejectClubMasterApplication(
  applicationId: number,
  rejectReason?: string,
): Promise<boolean> {
  try {
    await api.patch(`admin/club-master-applications/${applicationId}/reject`, {
      json: { rejectReason },
    });
    return true;
  } catch {
    return false;
  }
}

export default rejectClubMasterApplication;
