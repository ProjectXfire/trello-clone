import { User2 } from 'lucide-react';
import styles from './Boards.module.css';
import { NewBoard } from '..';

function Boards(): JSX.Element {
  return (
    <section>
      <header className={styles['boards-header']}>
        <User2 />
        <p>Your boards</p>
      </header>
      <div className={styles['boards-list']}>
        <NewBoard />
      </div>
    </section>
  );
}
export default Boards;
