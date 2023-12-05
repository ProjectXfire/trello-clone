import styles from './Header.module.css';

interface Props {
  text: string;
  icon: React.ReactNode;
  color?: string;
  bgColor?: string;
}

function Header({ icon, text, color = 'black', bgColor = 'transparent' }: Props): JSX.Element {
  return (
    <header className={styles.container} style={{ color, backgroundColor: bgColor }}>
      {icon}
      <p>{text}</p>
    </header>
  );
}
export default Header;
