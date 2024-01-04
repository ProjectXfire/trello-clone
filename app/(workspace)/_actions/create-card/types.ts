import { z } from 'zod';
import { type Card } from '@prisma/client';
import { createCardSchema } from './createSchema';
import { ActionState } from '@/shared/lib/createSafeAction';

export type InputType = z.infer<typeof createCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
