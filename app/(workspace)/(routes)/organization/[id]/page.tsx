import { Suspense } from 'react';
import { Boards, BoardsSkeleton, Info } from '@/app/(workspace)/_components';
import { Separator } from '@/shared/components';

async function OrganizationPage(): Promise<JSX.Element> {
  return (
    <>
      <Info />
      <Separator className='my-4' />
      <Suspense fallback={<BoardsSkeleton />}>
        <Boards />
      </Suspense>
    </>
  );
}
export default OrganizationPage;
