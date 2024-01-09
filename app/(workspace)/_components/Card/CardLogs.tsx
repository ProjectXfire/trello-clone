import { AuditLog } from '@prisma/client';
import { ActivityIcon } from 'lucide-react';
import styles from './Card.module.css';
import { Skeleton } from '@/shared/components';
import { LogMessage } from '..';

interface Props {
  logs: AuditLog[];
}

function CardLogs({ logs }: Props): JSX.Element {
  return (
    <div className={styles['card-dialog-logs-container']}>
      <ActivityIcon />
      <div className={styles['card-dialog-logs']}>
        <p className={styles['card-dialog-logs__title']}>Activity</p>
        <ol className={styles['card-dialog-logs__messages']}>
          {logs.map((log) => (
            <LogMessage key={log.id} log={log} />
          ))}
        </ol>
      </div>
    </div>
  );
}

CardLogs.Skeleton = function ActivitySkeleton() {
  return (
    <div className='flex gap-x-3 w-full'>
      <Skeleton className='h-6 w-6 bg-neutral-200' />
      <div className='w-full flex gap-2 flex-col'>
        <Skeleton className='w-24 h-6 bg-neutral-200' />
        <Skeleton className='w-full h-10 bg-neutral-200' />
      </div>
    </div>
  );
};

export default CardLogs;
