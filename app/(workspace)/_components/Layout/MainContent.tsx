import styles from './Layout.module.css';

interface Props {
  children: React.ReactNode;
}

function MainContent({ children }: Props): JSX.Element {
  return <main className={styles['main-container']}>{children}</main>;
}
export default MainContent;
