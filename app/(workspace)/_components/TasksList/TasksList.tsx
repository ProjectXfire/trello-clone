'use client';

import { ElementRef, useRef, useState } from 'react';
import { type IList } from '../../_interfaces';
import styles from './Board.module.css';
import { CardForm, CardItem, TasksListHeader } from '..';

interface Props {
  index: number;
  data: IList;
}

function TasksList({ index, data }: Props): JSX.Element {
  const textareaRef = useRef<ElementRef<'textarea'>>(null);

  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = (): void => {
    setIsEditing(false);
  };

  const enableEditing = (): void => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <li className={styles['taskslist']}>
      <TasksListHeader
        title={data.title}
        id={data.id}
        boardId={data.boardId}
        onAddCard={enableEditing}
      />
      <CardForm
        ref={textareaRef}
        listId={data.id}
        disableEditing={disableEditing}
        enableEditing={enableEditing}
        isEditing={isEditing}
      />
      <ol className={styles['taskslist-items']}>
        {data.cards?.map((card, index) => (
          <CardItem key={card.id} index={index} card={card} />
        ))}
      </ol>
    </li>
  );
}
export default TasksList;
