'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { type InputType, type ReturnType } from './types';
import db from '@/shared/lib/db';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { updateCardsOrderSchema } from './updateSchema';

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { items, boardId } = data;
  if (items.length === 0 || !boardId)
    return { error: 'Missing fields. Failed to update the cards' };
  let cards;
  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: { id: card.id, list: { board: { orgId } } },
        data: { order: card.order, listId: card.listId }
      })
    );
    cards = await db.$transaction(transaction);
  } catch (error) {
    return { error: 'Failed to reorder' };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: cards };
}

export const updateCardsOrder = createSafeAction(updateCardsOrderSchema, handler);
