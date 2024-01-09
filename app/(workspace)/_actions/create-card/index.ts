'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { type ReturnType, type InputType } from './types';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { createAuditLog } from '@/shared/lib/createAuditLog';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import db from '@/shared/lib/db';
import { createCardSchema } from './createSchema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { title, listId, boardId } = data;
  let card;
  try {
    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: 'desc' },
      select: { order: true }
    });
    const newOrder = lastCard ? lastCard.order + 1 : 1;
    card = await db.card.create({
      data: { title, listId, order: newOrder }
    });
    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.CARD
    });
  } catch (error) {
    return { error: 'Failed to create' };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(createCardSchema, handler);
