'use server';

import api from '@/shared/api/auth-api';

async function approveClubApplication(applicationId: number): Promise<boolean> {
  try {
    await api.post(`admin/club-applications/${applicationId}/approve`);
    return true;
  } catch {
    return false;
  }
}

export default approveClubApplication;
