import NextLink from 'next/link';
import styles from './Navbar.module.css';
import { Signup } from '..';
import { Button, Logo } from '@/app/shared/components';

function Navbar(): JSX.Element {
  return (
    <div className={styles.container}>
      <nav className={styles['nav-container']}>
        <Logo />
        <div className={styles['nav-actions']}>
          <Button className={styles['sign-in']} variant='outline' type='button' asChild>
            <NextLink href='/sign-in'>Login</NextLink>
          </Button>
          <Signup />
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
