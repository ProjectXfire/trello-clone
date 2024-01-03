import NextImage from 'next/image';
import styles from './Layout.module.css';

interface Props {
  children: React.ReactNode;
  backgroundImage: string;
}

function BoardContent({ children, backgroundImage }: Props): JSX.Element {
  return (
    <div className={styles['board-content']}>
      <div className={styles['board-content__image']}>
        <NextImage src={backgroundImage} fill alt='bg-image' />
      </div>
      {children}
    </div>
  );
}
export default BoardContent;
