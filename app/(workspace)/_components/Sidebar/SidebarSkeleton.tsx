'use client';

import styles from './Sidebar.module.css';
import { Skeleton } from '@/shared/components';

function SidebarSkeleton(): JSX.Element {
  return (
    <>
      <div className={styles['sidebar-skeleton']}>
        <Skeleton className='h-10 w-[50%] ' />
        <Skeleton className='h-10 w-10' />
      </div>
      <div className='space-y-2'>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>
    </>
  );
}

function SkeletonItem() {
  return (
    <div className={styles['sidebar-skeleton-item']}>
      <div className={styles['sidebar-skeleton-item__img']}>
        <Skeleton className='h-full w-full absolute' />
      </div>
      <Skeleton className='h-10 w-full' />
    </div>
  );
}

export default SidebarSkeleton;
