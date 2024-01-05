'use client';

import { Draggable } from '@hello-pangea/dnd';
import { type Card } from '@prisma/client';
import { useDialog } from '@/shared/states';
import styles from './Card.module.css';
import { CardDialog } from '..';

interface Props {
  card: Card;
  index: number;
}

function CardItem({ card, index }: Props): JSX.Element {
  const open = useDialog((s) => s.open);
  const setComponent = useDialog((s) => s.setComponent);

  const onOpenCardDialog = (): void => {
    open();
    setComponent(<CardDialog cardId={card.id} />);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }) => (
        <li
          role='button'
          className={styles['card-item']}
          {...draggableProps}
          {...dragHandleProps}
          ref={innerRef}
          onClick={onOpenCardDialog}
        >
          <p>{card.title}</p>
        </li>
      )}
    </Draggable>
  );
}
export default CardItem;
