import styles from './Content.module.css';

interface Props {
  children: React.ReactNode;
}

function Content({ children }: Props): JSX.Element {
  return <main className={styles.container}>{children}</main>;
}
export default Content;
