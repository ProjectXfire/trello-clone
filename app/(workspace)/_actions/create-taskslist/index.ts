'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { type InputType, type ReturnType } from './types';
import db from '@/shared/lib/db';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { createTasksListSchema } from './createSchema';
import { createAuditLog } from '@/shared/lib/createAuditLog';

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { title, id } = data;
  if (!title || !id) return { error: 'Missing fields. Failed to update board' };
  let tasksList;
  try {
    const board = await db.board.findUnique({ where: { id, orgId } });
    if (!board) return { error: 'Board not found' };
    const lastList = await db.list.findFirst({
      where: { boardId: id },
      orderBy: { order: 'desc' },
      select: { order: true }
    });
    const newOrder = lastList ? lastList.order + 1 : 0;
    tasksList = await db.list.create({ data: { title, boardId: id, order: newOrder } });
    await createAuditLog({
      entityId: tasksList.id,
      entityTitle: tasksList.title,
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.LIST
    });
  } catch (error) {
    return { error: 'Failed to update' };
  }
  revalidatePath(`/board/${id}`);
  return { data: tasksList };
}

export const createTasksList = createSafeAction(createTasksListSchema, handler);
