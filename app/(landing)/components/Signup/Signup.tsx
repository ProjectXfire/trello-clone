import NextLink from 'next/link';
import styles from './Signup.module.css';
import { Button } from '@/app/shared/components';

function Signup(): JSX.Element {
  return (
    <Button className={styles.button} variant='outline' type='button' asChild>
      <NextLink href='/sign-up'>Get Taskify for free</NextLink>
    </Button>
  );
}
export default Signup;
