'use server';

import { auth } from '@clerk/nextjs';
import { type InputType, type ReturnType } from './types';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import db from '@/shared/lib/db';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { deleteTasksListSchema } from './deleteSchema';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/shared/lib/createAuditLog';

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { id, boardId } = data;
  if (!id || !boardId) return { error: 'Missing fields. Failed to delete list' };
  let list;
  try {
    list = await db.list.delete({ where: { id, boardId, board: { orgId } } });
    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      action: ACTION.DELETE,
      entityType: ENTITY_TYPE.LIST
    });
  } catch (error) {
    return { error: 'Failed to delete' };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
}

export const deleteTasksList = createSafeAction(deleteTasksListSchema, handler);
