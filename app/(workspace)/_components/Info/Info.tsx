'use client';

import NextImage from 'next/image';
import { useOrganization } from '@clerk/nextjs';
import styles from './Info.module.css';
import { CreditCard } from 'lucide-react';
import { Skeleton } from '@/shared/components';

function Info(): JSX.Element {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) return <Info.Skeleton />;

  if (!organization) return <p>No info</p>;

  return (
    <section className={styles.container}>
      <NextImage
        className={styles.image}
        width={80}
        height={80}
        priority
        src={organization.imageUrl}
        alt={organization.name}
      />
      <div className={styles.detail}>
        <p>{organization.name}</p>
        <div className={styles.subscription}>
          <CreditCard size={20} />
          <p>Free</p>
        </div>
      </div>
    </section>
  );
}

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className={styles['skeleton-container']}>
      <div className={styles['skeleton-image']}>
        <Skeleton className='w-full h-full absolute' />
      </div>
      <div className={styles['skeleton-detail']}>
        <Skeleton className='w-[200px] h-10' />
        <div className={styles['skeleton-subcription']}>
          <Skeleton className='h-6 w-6 mr-2' />
          <Skeleton className='h-4 w-[100px]' />
        </div>
      </div>
    </div>
  );
};

export default Info;
