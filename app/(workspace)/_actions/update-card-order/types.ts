import { z } from 'zod';
import { type Card } from '@prisma/client';
import { updateCardsOrderSchema } from './updateSchema';
import { ActionState } from '@/shared/lib/createSafeAction';

export type InputType = z.infer<typeof updateCardsOrderSchema>;
export type ReturnType = ActionState<InputType, Card[]>;
