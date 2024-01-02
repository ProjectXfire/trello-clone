import { notFound, redirect } from 'next/navigation';
import db from '@/shared/lib/db';
import { auth } from '@clerk/nextjs';
import { BoardContent, BoardNavbar } from '@/app/(workspace)/_components';
import { startCase } from 'lodash';

interface Props {
  children: React.ReactNode;
  params: { id: string };
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { orgId } = auth();
  if (!orgId) return { title: 'Board' };
  const board = await db.board.findUnique({ where: { id: params.id, orgId } });
  return {
    title: startCase(board?.title || 'Board')
  };
}

async function BoardLayput({ children, params }: Props): Promise<JSX.Element> {
  const { orgId } = auth();

  if (!orgId) redirect('/select-org');

  const board = await db.board.findUnique({ where: { id: params.id, orgId } });

  if (!board) {
    notFound();
  }

  return (
    <BoardContent backgroundImage={board.imageFullUrl}>
      <BoardNavbar id={params.id} data={board} />
      {children}
    </BoardContent>
  );
}
export default BoardLayput;
