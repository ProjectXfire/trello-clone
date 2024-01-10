import { Suspense } from 'react';
import { checkSubscription } from '@/shared/lib/subscription';
import { Boards, BoardsSkeleton, Info } from '@/app/(workspace)/_components';
import { Separator } from '@/shared/components';

async function OrganizationPage(): Promise<JSX.Element> {
  const isPro = await checkSubscription();

  return (
    <div className='pb-4'>
      <Info isProp={isPro} />
      <Separator className='my-4' />
      <Suspense fallback={<BoardsSkeleton />}>
        <Boards />
      </Suspense>
    </div>
  );
}
export default OrganizationPage;
