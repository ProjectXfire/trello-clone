'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { type ReturnType, type InputType } from './types';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import db from '@/shared/lib/db';
import { createBoardSchema } from './createSchema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: 'Unauthorized' };
  const { title, image } = data;
  const [imageId, imageThumUrl, imageFullUrl, imageLinkHTML, imageUsername] = image.split('|');
  if (!imageId || !imageThumUrl || !imageFullUrl || !imageLinkHTML || !imageUsername)
    return { error: 'Missing fields. Failed to create board' };
  let board;
  try {
    board = await db.board.create({
      data: { title, orgId, imageId, imageFullUrl, imageLinkHTML, imageThumUrl, imageUsername }
    });
  } catch (error) {
    return { error: 'Failed to create' };
  }
  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(createBoardSchema, handler);
