'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { type InputType, type ReturnType } from './types';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import db from '@/shared/lib/db';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { updateBoardSchema } from './updateSchema';
import { createAuditLog } from '@/shared/lib/createAuditLog';

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { title, id } = data;
  if (!title || !id) return { error: 'Missing fields. Failed to update board' };
  let board;
  try {
    board = await db.board.update({ where: { id, orgId }, data: { title } });
    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      action: ACTION.UPDATE,
      entityType: ENTITY_TYPE.BOARD
    });
  } catch (error) {
    return { error: 'Failed to update' };
  }
  revalidatePath(`/board/${board.id}`);
  return { data: board };
}

export const updateBoard = createSafeAction(updateBoardSchema, handler);
