'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { type InputType, type ReturnType } from './types';
import db from '@/shared/lib/db';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { updateTasksListOrderSchema } from './updateSchema';

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { items, boardId } = data;
  if (!boardId || items.length === 0)
    return { error: 'Missing fields. Failed to update the lists' };
  let tasksLists;
  try {
    const transaction = items.map((list) => {
      return db.list.update({
        where: { id: list.id, boardId, board: { orgId } },
        data: { order: list.order }
      });
    });
    tasksLists = await db.$transaction(transaction);
  } catch (error) {
    return { error: 'Failed to reorder' };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: tasksLists };
}

export const updateTasksListOrder = createSafeAction(updateTasksListOrderSchema, handler);
