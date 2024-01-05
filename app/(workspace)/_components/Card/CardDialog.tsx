'use client';

import { useQuery } from '@tanstack/react-query';
import { type ICard } from '../../_interfaces';
import { fetcher } from '@/shared/helpers';
import styles from './Card.module.css';
import { CardDialogHeader } from '..';

interface Props {
  cardId: string;
}

function CardDialog({ cardId }: Props): JSX.Element {
  const {
    data: cardData,
    isLoading,
    error
  } = useQuery<ICard>({
    queryKey: ['card', cardId],
    queryFn: () => fetcher(`/api/cards/${cardId}`)
  });

  if (isLoading)
    return (
      <>
        <CardDialogHeader.Skeleton />
      </>
    );

  if (error) return <p>error...</p>;

  return (
    <div>
      <CardDialogHeader data={cardData!} />
    </div>
  );
}
export default CardDialog;
