import styles from './Boards.module.css';
import { Skeleton } from '@/shared/components';

function BoardsSkeleton(): JSX.Element {
  return (
    <div className={styles['boards-list']}>
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
    </div>
  );
}
export default BoardsSkeleton;
