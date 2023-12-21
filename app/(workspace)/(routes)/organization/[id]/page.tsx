import { Boards, CreateForm } from '@/app/(workspace)/_components';
import db from '@/shared/lib/db';

async function OrganizationPage(): Promise<JSX.Element> {
  const boards = await db.board.findMany();

  return (
    <>
      <CreateForm />
      <Boards data={boards} />
    </>
  );
}
export default OrganizationPage;
