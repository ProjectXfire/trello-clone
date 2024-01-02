import { z } from 'zod';
import { deleteBoardSchema } from './deleteSchema';
import { ActionState } from '@/shared/lib/createSafeAction';

export type InputType = z.infer<typeof deleteBoardSchema>;
export type ReturnType = ActionState<InputType, null>;
