import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import db from '@/shared/lib/db';
import styles from './Boards.module.css';
import { User2 } from 'lucide-react';
import { BoardItem, NewBoard } from '..';
import { getAvailableCount } from '@/shared/lib/org-limit';
import { checkSubscription } from '@/shared/lib/subscription';

async function Boards(): Promise<JSX.Element> {
  const { orgId } = auth();

  if (!orgId) redirect('select-org');

  const boards = await db.board.findMany({ where: { orgId }, orderBy: { createdAt: 'desc' } });
  const availableCounts = await getAvailableCount();
  const isPro = await checkSubscription();

  return (
    <section>
      <header className={styles['boards-header']}>
        <User2 />
        <p>Your boards</p>
      </header>
      <div className={styles['boards-list']}>
        <NewBoard availableCounts={availableCounts} isPro={isPro} />
        {boards.map((board) => (
          <BoardItem key={board.id} board={board} />
        ))}
      </div>
    </section>
  );
}

export default Boards;
