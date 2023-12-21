'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { type ReturnType, type InputType } from './types';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import db from '@/shared/lib/db';
import { createBoardSchema } from './createSchema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();
  if (!userId) return { error: 'Unauthorized' };
  const { title } = data;
  let board;
  try {
    board = await db.board.create({ data: { title } });
  } catch (error) {
    return { error: 'Failed to create' };
  }
  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(createBoardSchema, handler);
