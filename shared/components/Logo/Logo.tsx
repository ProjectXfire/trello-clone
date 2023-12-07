import NextImage from 'next/image';
import styles from './Logo.module.css';

function Logo(): JSX.Element {
  return (
    <div className={styles.logo}>
      <div className={styles.logo__img}>
        <NextImage src='/images/logo.svg' alt='logo' fill />
      </div>
      <p>Taskify</p>
    </div>
  );
}
export default Logo;
