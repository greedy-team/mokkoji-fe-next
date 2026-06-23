'use server';

import api from '@/shared/api/dashboard-api';

async function approveClubMasterApplication(
  applicationId: number,
): Promise<boolean> {
  try {
    await api.patch(`admin/club-master-applications/${applicationId}/approve`);
    return true;
  } catch {
    return false;
  }
}

export default approveClubMasterApplication;
