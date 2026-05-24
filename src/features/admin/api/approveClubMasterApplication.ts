'use server';

import api from '@/shared/api/auth-api';

async function approveClubMasterApplication(
  applicationId: number,
): Promise<boolean> {
  try {
    await api.post(`admin/club-master-applications/${applicationId}/approve`);
    return true;
  } catch {
    return false;
  }
}

export default approveClubMasterApplication;
