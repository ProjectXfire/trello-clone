'use server';

import { auth } from '@clerk/nextjs';
import { type InputType, type ReturnType } from './types';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import db from '@/shared/lib/db';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { copyCardSchema } from './copySchema';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/shared/lib/createAuditLog';

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { cardId, boardId } = data;
  if (!cardId || !boardId) return { error: 'Missing fields. Failed to copy card' };
  let card;
  try {
    const copyCard = await db.card.findUnique({
      where: { id: cardId, list: { board: { orgId } } }
    });
    if (!copyCard) return { error: 'Copy card not found' };
    const lastCard = await db.card.findFirst({
      where: { listId: copyCard.listId },
      orderBy: { order: 'desc' },
      select: { order: true }
    });
    const newOrder = lastCard ? lastCard.order + 1 : 0;
    card = await db.card.create({
      data: {
        title: `copy of ${copyCard.title}`,
        order: newOrder,
        description: copyCard.description,
        listId: copyCard.listId
      }
    });
    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.CARD
    });
  } catch (error) {
    return { error: 'Failed to copy' };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
}

export const copyCard = createSafeAction(copyCardSchema, handler);
