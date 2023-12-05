import styles from './Footer.module.css';
import { Button, Logo } from '@/shared/components';

function Footer(): JSX.Element {
  return (
    <footer className={styles.container}>
      <div className={styles['footer-logo']}>
        <Logo />
      </div>
      <div className={styles['footer-actions']}>
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
