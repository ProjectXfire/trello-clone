import { Boards, Info } from '@/app/(workspace)/_components';
import { Separator } from '@/shared/components';

async function OrganizationPage(): Promise<JSX.Element> {
  return (
    <>
      <Info />
      <Separator className='my-4' />
      <Boards />
    </>
  );
}
export default OrganizationPage;
