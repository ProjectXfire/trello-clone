'use client';

import styles from './Card.module.css';
import { type Card } from '@prisma/client';

interface Props {
  card: Card;
  index: number;
}

function CardItem({ card }: Props): JSX.Element {
  return (
    <li className={styles['card-item']}>
      <p>{card.title}</p>
    </li>
  );
}
export default CardItem;
