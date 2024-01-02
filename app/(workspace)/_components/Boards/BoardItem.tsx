import NextLink from 'next/link';
import NextImage from 'next/image';
import styles from './Boards.module.css';
import { type Board } from '@prisma/client';

interface Props {
  board: Board;
}

function BoardItem({ board }: Props) {
  return (
    <NextLink className={styles['board-item']} key={board.id} href={`/board/${board.id}`}>
      <NextImage
        src={board.imageThumUrl}
        alt={board.title}
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
      <p>{board.title}</p>
    </NextLink>
  );
}
export default BoardItem;
