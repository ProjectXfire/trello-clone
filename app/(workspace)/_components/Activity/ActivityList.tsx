import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import db from '@/shared/lib/db';
import styles from './Activity.module.css';
import { LogMessage } from '..';
import { Skeleton } from '@/shared/components';

async function ActivityList(): Promise<JSX.Element> {
  const { orgId } = auth();

  if (!orgId) redirect('/select-org');

  const auditLogs = await db.auditLog.findMany({
    where: { orgId },
    orderBy: { createdAt: 'desc' }
  });

  if (auditLogs.length === 0)
    return <p className={styles['activity-logs-empty']}>No activity logs for this organization</p>;

  return (
    <ol className={styles['activity-logs-list']}>
      {auditLogs.map((log) => (
        <LogMessage key={log.id} log={log} />
      ))}
    </ol>
  );
}

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className='soace-y-4 mt-4'>
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[50%] h-14' />
      <Skeleton className='w-[70%] h-14' />
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[75%] h-14' />
      <Skeleton className='w-[90%] h-14' />
      <Skeleton className='w-[85%] h-14' />
    </ol>
  );
};

export default ActivityList;
