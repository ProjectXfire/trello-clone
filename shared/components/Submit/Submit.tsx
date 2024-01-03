'use client';

import { useFormStatus } from 'react-dom';
import styles from './Submit.module.css';
import { Button } from '..';

type TVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  variant?: TVariant;
}

function Submit({ children, disabled, variant = 'default' }: Props): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <Button
      className={styles.submit}
      type='submit'
      size='sm'
      variant={variant}
      disabled={pending || disabled}
    >
      {children}
    </Button>
  );
}
export default Submit;
