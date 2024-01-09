'use server';

import { auth } from '@clerk/nextjs';
import { type InputType, type ReturnType } from './types';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import db from '@/shared/lib/db';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { copyTasksListSchema } from './copySchema';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/shared/lib/createAuditLog';

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { id, boardId } = data;
  if (!id || !boardId) return { error: 'Missing fields. Failed to copy list' };
  let tasksList;
  try {
    const copyList = await db.list.findUnique({
      where: { id, boardId, board: { orgId } },
      include: { cards: true }
    });
    if (!copyList) return { error: 'Copy list not found' };
    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
      select: { order: true }
    });
    const newOrder = lastList ? lastList.order + 1 : 0;
    tasksList = await db.list.create({
      data: {
        title: `copy of ${copyList.title}`,
        boardId,
        order: newOrder,
        cards: {
          createMany: {
            data: copyList.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order
            }))
          }
        }
      },
      include: { cards: true }
    });
    await createAuditLog({
      entityId: tasksList.id,
      entityTitle: tasksList.title,
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.LIST
    });
  } catch (error) {
    return { error: 'Failed to copy' };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: tasksList };
}

export const copyTasksList = createSafeAction(copyTasksListSchema, handler);
