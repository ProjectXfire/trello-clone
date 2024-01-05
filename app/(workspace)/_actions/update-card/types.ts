import { z } from 'zod';
import { type Card } from '@prisma/client';
import { updateCardSchema } from './updateSchema';
import { ActionState } from '@/shared/lib/createSafeAction';

export type InputType = z.infer<typeof updateCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
