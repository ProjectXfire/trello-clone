import NextImage from 'next/image';
import styles from './Logo.module.css';

function Logo(): JSX.Element {
  return (
    <div className={styles.logo}>
      <NextImage src='/images/logo.svg' alt='logo' width={40} height={40} />
      <p>Taskify</p>
    </div>
  );
}
export default Logo;
