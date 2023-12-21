'use server';

import { revalidatePath } from 'next/cache';
import db from '@/shared/lib/db';

export async function deleteBoard(id: string) {
  await db.board.delete({ where: { id } });

  revalidatePath('/organization/org_2ZBF2afRKw4HmI2I1TzHusgsvps');
}
