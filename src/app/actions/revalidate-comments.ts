'use server';

import { revalidatePath } from 'next/cache';

export default async function revalidateComments(clubId: number) {
  revalidatePath(`/recruit/${clubId}`);
}
