import { z } from 'zod';
import { type Board } from '@prisma/client';
import { updateBoardSchema } from './updateSchema';
import { ActionState } from '@/shared/lib/createSafeAction';

export type InputType = z.infer<typeof updateBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;
