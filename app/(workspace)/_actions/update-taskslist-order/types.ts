import { z } from 'zod';
import { type List } from '@prisma/client';
import { updateTasksListOrderSchema } from './updateSchema';
import { ActionState } from '@/shared/lib/createSafeAction';

export type InputType = z.infer<typeof updateTasksListOrderSchema>;
export type ReturnType = ActionState<InputType, List[]>;
