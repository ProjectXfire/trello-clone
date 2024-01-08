import { z } from 'zod';
import { type Card } from '@prisma/client';
import { copyCardSchema } from './copySchema';
import { ActionState } from '@/shared/lib/createSafeAction';

export type InputType = z.infer<typeof copyCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
