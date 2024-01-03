import db from '@/shared/lib/db';
import { auth } from '@clerk/nextjs';
import { AddTasksList, TasksListContainer } from '@/app/(workspace)/_components';

interface Props {
  params: { id: string };
}

async function BoardPage({ params }: Props): Promise<JSX.Element> {
  const { id } = params;

  const { orgId } = auth();

  const list = await db.list.findMany({
    where: { boardId: id, board: { orgId: orgId! } },
    include: { cards: { orderBy: { order: 'asc' } } },
    orderBy: { order: 'asc' }
  });

  return (
    <section className='p-2 pt-[80px]'>
      <AddTasksList />
      <TasksListContainer boardId={id} data={list} />
    </section>
  );
}
export default BoardPage;
