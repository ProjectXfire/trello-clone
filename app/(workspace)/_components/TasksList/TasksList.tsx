'use client';

import { ElementRef, useRef, useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
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
    <Draggable draggableId={data.id} index={index}>
      {({ innerRef, dragHandleProps, draggableProps }) => (
        <li className={styles['taskslist']} {...draggableProps} ref={innerRef}>
          <div {...dragHandleProps}>
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
            <Droppable droppableId={data.id} type='card'>
              {({ droppableProps, innerRef, placeholder }) => (
                <ol className={styles['taskslist-items']} {...droppableProps} ref={innerRef}>
                  {data.cards?.map((card, index) => (
                    <CardItem key={card.id} index={index} card={card} />
                  ))}
                  {placeholder}
                </ol>
              )}
            </Droppable>
          </div>
        </li>
      )}
    </Draggable>
  );
}
export default TasksList;
