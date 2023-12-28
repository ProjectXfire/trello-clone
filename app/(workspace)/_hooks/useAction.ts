import { useState, useCallback } from 'react';
import { type ActionState, type FieldsErrors } from '@/shared/lib/createSafeAction';

type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>;

interface IUseActionsOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onCompleted?: () => void;
}

export function useAction<TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: IUseActionsOptions<TOutput> = {}
) {
  const [fieldErrors, setFieldErrors] = useState<FieldsErrors<TInput> | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<TOutput | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        const result = await action(input);
        if (!result) return;
        setFieldErrors(result.fieldErrors);
        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }
        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options.onCompleted?.();
      }
    },
    [action, options]
  );

  const clearData = (): void => {
    setError(undefined);
    setData(undefined);
    setFieldErrors(undefined);
  };

  return {
    error,
    fieldErrors,
    isLoading,
    data,
    execute,
    clearData
  };
}
