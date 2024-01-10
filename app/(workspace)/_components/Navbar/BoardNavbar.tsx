import { type Board } from '@prisma/client';
import styles from './Navbar.module.css';
import { BoardNavbarOptions, UpdateTitle } from '..';

interface Props {
  id: string;
  data: Board;
}

async function BoardNavbar({ id, data }: Props): Promise<JSX.Element> {
  return (
    <div className={styles['board-navbar']}>
      <UpdateTitle data={data} />
      <BoardNavbarOptions id={id} />
    </div>
  );
}
export default BoardNavbar;
