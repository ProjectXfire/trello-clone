import { z } from 'zod';
import { type List } from '@prisma/client';
import { deleteTasksListSchema } from './deleteSchema';
import { ActionState } from '@/shared/lib/createSafeAction';

export type InputType = z.infer<typeof deleteTasksListSchema>;
export type ReturnType = ActionState<InputType, List>;
