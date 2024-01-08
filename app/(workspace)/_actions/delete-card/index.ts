'use server';

import { auth } from '@clerk/nextjs';
import { type InputType, type ReturnType } from './types';
import db from '@/shared/lib/db';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { deleteCardSchema } from './deleteSchema';
import { revalidatePath } from 'next/cache';

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { cardId, boardId } = data;
  if (!cardId || !boardId) return { error: 'Missing fields. Failed to delete card' };
  let card;
  try {
    card = await db.card.delete({ where: { id: cardId, list: { board: { orgId } } } });
  } catch (error) {
    return { error: 'Failed to delete' };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
}

export const deleteCard = createSafeAction(deleteCardSchema, handler);
