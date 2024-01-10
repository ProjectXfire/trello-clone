import { Suspense } from 'react';
import { checkSubscription } from '@/shared/lib/subscription';
import { ActivityList, Info } from '@/app/(workspace)/_components';
import { Separator } from '@/shared/components';

async function ActivityPage(): Promise<JSX.Element> {
  const isPro = await checkSubscription();

  return (
    <div className='pb-4'>
      <Info isProp={isPro} />
      <Separator className='my-4' />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
}
export default ActivityPage;
