'use client';

import { toast } from 'sonner';
import { useAction } from '../../_hooks';
import { stripeRedirect } from '../../_actions/stripe-redirect';
import { useDialog } from '@/shared/states';
import { Button } from '@/shared/components';
import { SubscriptionDialog } from '..';

interface Props {
  isPro: boolean;
}

function SubscriptionButton({ isPro }: Props): JSX.Element {
  const open = useDialog((s) => s.open);
  const setComponent = useDialog((s) => s.setComponent);

  const { execute, isLoading } = useAction(stripeRedirect, {
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: (data) => {
      window.location.href = data;
    }
  });

  const onHandleSubscription = (): void => {
    if (isPro) {
      execute({});
    } else {
      setComponent(<SubscriptionDialog />);
      open();
    }
  };

  return (
    <Button type='button' disabled={isLoading} onClick={onHandleSubscription}>
      {isPro ? 'Manage subscription' : 'Upgrade to pro'}
    </Button>
  );
}
export default SubscriptionButton;
