import { z } from 'zod';
import { stripeRedirectSchema } from './stripeSchema';
import { ActionState } from '@/shared/lib/createSafeAction';

export type InputType = z.infer<typeof stripeRedirectSchema>;
export type ReturnType = ActionState<InputType, string>;
