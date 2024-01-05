'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { type InputType, type ReturnType } from './types';
import db from '@/shared/lib/db';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { updateCardSchema } from './updateSchema';

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { boardId, cardId, ...values } = data;
  if (!boardId || !cardId) return { error: 'Missing fields. Failed to update card' };
  let card;
  try {
    card = await db.card.update({
      where: { id: cardId, list: { board: { orgId } } },
      data: { ...values }
    });
  } catch (error) {
    return { error: 'Failed to update' };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
}

export const updateCard = createSafeAction(updateCardSchema, handler);
