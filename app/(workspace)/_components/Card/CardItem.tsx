'use client';

import { Draggable } from '@hello-pangea/dnd';
import styles from './Card.module.css';
import { type Card } from '@prisma/client';

interface Props {
  card: Card;
  index: number;
}

function CardItem({ card, index }: Props): JSX.Element {
  return (
    <Draggable draggableId={card.id} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }) => (
        <li className={styles['card-item']} {...draggableProps} {...dragHandleProps} ref={innerRef}>
          <p>{card.title}</p>
        </li>
      )}
    </Draggable>
  );
}
export default CardItem;
