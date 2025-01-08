'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { type ReturnType, type InputType } from './types';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import db from '@/shared/lib/db';
import { createBoardSchema } from './createSchema';
import { createAuditLog } from '@/shared/lib/createAuditLog';
import { incrementAvailableCount, hasAvailableCount } from '@/shared/lib/org-limit';
import { checkSubscription } from '@/shared/lib/subscription';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { data: canCreateMore } = await hasAvailableCount();
  const isPro = await checkSubscription();
  if (!canCreateMore && !isPro)
    return { error: 'You have reached your limit of free boards. Please upgrade to create more.' };
  const { title, image } = data;
  const [imageId, imageThumUrl, imageFullUrl, imageLinkHTML, imageUsername] = image.split('|');
  if (!imageId || !imageThumUrl || !imageFullUrl || !imageLinkHTML || !imageUsername)
    return { error: 'Missing fields. Failed to create board' };
  let board;
  try {
    board = await db.board.create({
      data: { title, orgId, imageId, imageFullUrl, imageLinkHTML, imageThumUrl, imageUsername }
    });
    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.BOARD
    });
    if (!isPro) await incrementAvailableCount();
  } catch (error) {
    return { error: 'Failed to create' };
  }
  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(createBoardSchema, handler);
