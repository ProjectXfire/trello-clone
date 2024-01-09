'use server';

import { auth } from '@clerk/nextjs';
import { type InputType, type ReturnType } from './types';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import db from '@/shared/lib/db';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { deleteCardSchema } from './deleteSchema';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/shared/lib/createAuditLog';

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { cardId, boardId } = data;
  if (!cardId || !boardId) return { error: 'Missing fields. Failed to delete card' };
  let card;
  try {
    card = await db.card.delete({ where: { id: cardId, list: { board: { orgId } } } });
    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      action: ACTION.DELETE,
      entityType: ENTITY_TYPE.CARD
    });
  } catch (error) {
    return { error: 'Failed to delete' };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
}

export const deleteCard = createSafeAction(deleteCardSchema, handler);
