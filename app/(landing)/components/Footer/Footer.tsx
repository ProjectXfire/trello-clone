import styles from './Footer.module.css';
import { Button, Logo } from '@/app/shared/components';

function Footer(): JSX.Element {
  return (
    <footer className={styles.container}>
      <Logo />
      <div className={styles.actions}>
        <Button size='sm' variant='ghost'>
          Privacy Policy
        </Button>
        <Button size='sm' variant='ghost'>
          Terms of Service
        </Button>
      </div>
    </footer>
  );
}
export default Footer;
