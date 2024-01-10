'use server';

import { auth } from '@clerk/nextjs';
import { type InputType, type ReturnType } from './types';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import db from '@/shared/lib/db';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { deleteBoardSchema } from './deleteSchema';
import { redirect } from 'next/navigation';
import { createAuditLog } from '@/shared/lib/createAuditLog';
import { decrementAvailableCount } from '@/shared/lib/org-limit';
import { checkSubscription } from '@/shared/lib/subscription';

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { id } = data;
  if (!id) return { error: 'Missing fields. Failed to delete board' };
  const isPro = await checkSubscription();
  try {
    const board = await db.board.delete({ where: { id, orgId } });
    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      action: ACTION.DELETE,
      entityType: ENTITY_TYPE.BOARD
    });
    if (!isPro) await decrementAvailableCount();
  } catch (error) {
    return { error: 'Failed to delete' };
  }
  redirect(`/`);
}

export const deleteBoard = createSafeAction(deleteBoardSchema, handler);
