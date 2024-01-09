import { Suspense } from 'react';
import { ActivityList, Info } from '@/app/(workspace)/_components';
import { Separator } from '@/shared/components';

function ActivityPage(): JSX.Element {
  return (
    <>
      <Info />
      <Separator className='my-4' />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </>
  );
}
export default ActivityPage;
