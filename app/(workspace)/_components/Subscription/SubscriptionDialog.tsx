'use client';

import NextImage from 'next/image';
import { toast } from 'sonner';
import { useAction } from '../../_hooks';
import { stripeRedirect } from '../../_actions/stripe-redirect';
import styles from './Subscription.module.css';
import { Button } from '@/shared/components';

function SubscriptionDialog(): JSX.Element {
  const { execute, isLoading } = useAction(stripeRedirect, {
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: (data) => {
      window.location.href = data;
    }
  });

  const onUpgradeAccount = () => {
    execute({});
  };

  return (
    <div className={styles['subscription-dialog']}>
      <div className={styles['subscription-dialog__img']}>
        <NextImage src='/images/hero.svg' alt='hero' fill />
      </div>
      <div className={styles['subscription-dialog__content']}>
        <h1>Upgrade to taskify Pro today!</h1>
        <p>Explore the best of taskify</p>
        <ol>
          <li>Unlimited boards</li>
          <li>Advanced checklist</li>
          <li>Admin and security features</li>
          <li>And more!</li>
        </ol>
        <Button type='button' disabled={isLoading} onClick={onUpgradeAccount}>
          Upgrade
        </Button>
      </div>
    </div>
  );
}
export default SubscriptionDialog;
