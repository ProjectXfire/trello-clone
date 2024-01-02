'use server';

import { auth } from '@clerk/nextjs';
import { type InputType, type ReturnType } from './types';
import db from '@/shared/lib/db';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { deleteBoardSchema } from './deleteSchema';
import { redirect } from 'next/navigation';

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { id } = data;
  if (!id) return { error: 'Missing fields. Failed to delete board' };
  try {
    await db.board.delete({ where: { id, orgId } });
  } catch (error) {
    return { error: 'Failed to delete' };
  }
  redirect(`/`);
}

export const deleteBoard = createSafeAction(deleteBoardSchema, handler);
