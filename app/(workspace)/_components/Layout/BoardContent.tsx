import styles from './Layout.module.css';

interface Props {
  children: React.ReactNode;
  backgroundImage: string;
}

function BoardContent({ children, backgroundImage }: Props): JSX.Element {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }} className={styles['board-content']}>
      {children}
    </div>
  );
}
export default BoardContent;
