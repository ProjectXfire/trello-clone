'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { type InputType, type ReturnType } from './types';
import db from '@/shared/lib/db';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { updateBoardSchema } from './updateSchema';

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { title, id } = data;
  if (!title || !id) return { error: 'Missing fields. Failed to update board' };
  let board;
  try {
    board = await db.board.update({ where: { id, orgId }, data: { title } });
  } catch (error) {
    return { error: 'Failed to update' };
  }
  revalidatePath(`/board/${board.id}`);
  return { data: board };
}

export const createBoard = createSafeAction(updateBoardSchema, handler);
