import { z } from 'zod';
import { type Board } from '@prisma/client';
import { createBoardSchema } from './createSchema';
import { ActionState, createSafeAction } from '@/shared/lib/createSafeAction';

export type InputType = z.infer<typeof createBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;
