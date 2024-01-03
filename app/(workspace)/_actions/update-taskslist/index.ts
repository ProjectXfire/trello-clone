'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { type InputType, type ReturnType } from './types';
import db from '@/shared/lib/db';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { updateTasksListSchema } from './updateSchema';

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { title, id, boardId } = data;
  if (!title || !id || !boardId) return { error: 'Missing fields. Failed to update list' };
  let tasksList;
  try {
    tasksList = await db.list.update({ where: { id, boardId }, data: { title } });
  } catch (error) {
    return { error: 'Failed to update' };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: tasksList };
}

export const updateTasksList = createSafeAction(updateTasksListSchema, handler);
