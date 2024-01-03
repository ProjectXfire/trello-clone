import { z } from 'zod';
import { type List } from '@prisma/client';
import { copyTasksListSchema } from './copySchema';
import { ActionState } from '@/shared/lib/createSafeAction';

export type InputType = z.infer<typeof copyTasksListSchema>;
export type ReturnType = ActionState<InputType, List>;
