'use client';

import { useQuery } from '@tanstack/react-query';
import { type ICard } from '../../_interfaces';
import { type AuditLog } from '@prisma/client';
import { fetcher } from '@/shared/helpers';
import styles from './Card.module.css';
import { CardLogs, CardActions, CardDialogDescription, CardDialogHeader } from '..';

interface Props {
  cardId: string;
}

function CardDialog({ cardId }: Props): JSX.Element {
  const { data: cardData, isLoading: isLoadingCard } = useQuery<ICard>({
    queryKey: ['card', cardId],
    queryFn: () => fetcher(`/api/cards/${cardId}`)
  });

  const { data: auditLogsData, isLoading: isLoadingAuditLogs } = useQuery<AuditLog[]>({
    queryKey: ['card-logs', cardId],
    queryFn: () => fetcher(`/api/cards/${cardId}/logs`)
  });

  if (isLoadingCard)
    return (
      <>
        <CardDialogHeader.Skeleton />
        <CardDialogDescription.Skeleton />
        <CardActions.Skeleton />
      </>
    );

  return (
    <div className={styles['card-dialog']}>
      <CardDialogHeader data={cardData!} />
      <div className={styles['card-dialog-content']}>
        <div className={styles['card-dialog-content__data']}>
          <CardDialogDescription data={cardData!} />
          {isLoadingAuditLogs ? <CardLogs.Skeleton /> : <CardLogs logs={auditLogsData!} />}
        </div>
        <CardActions data={cardData!} />
      </div>
    </div>
  );
}
export default CardDialog;
