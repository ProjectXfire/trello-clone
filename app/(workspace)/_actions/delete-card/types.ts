import { z } from 'zod';
import { type Card } from '@prisma/client';
import { deleteCardSchema } from './deleteSchema';
import { ActionState } from '@/shared/lib/createSafeAction';

export type InputType = z.infer<typeof deleteCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
