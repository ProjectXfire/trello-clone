'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, type DropResult, Droppable } from '@hello-pangea/dnd';
import { toast } from 'sonner';
import { type IList } from '../../_interfaces';
import { useAction } from '../../_hooks';
import { updateTasksListOrder } from '../../_actions/update-taskslist-order';
import { updateCardsOrder } from '../../_actions/update-card-order';
import styles from './Board.module.css';
import { TasksList } from '..';

interface Props {
  boardId: string;
  data: IList[];
}

function reorder<T>(list: T[], oldPos: number, newPos: number) {
  const result = Array.from(list);
  const [removed] = result.splice(oldPos, 1);
  result.splice(newPos, 0, removed);
  return result;
}

function TasksListContainer({ boardId, data }: Props) {
  const [orderedData, setOrderedData] = useState(data);

  const { execute: executeUpdateListsOrder } = useAction(updateTasksListOrder, {
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: () => {
      toast.success('Lists successfully reordered');
    }
  });

  const { execute: executeUpdateCardsOrder } = useAction(updateCardsOrder, {
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: () => {
      toast.success('Cards successfully reordered');
    }
  });

  const onDragEnd = (result: DropResult): void => {
    const { destination, source, type } = result;
    if (!destination) return;
    // Dropped in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    // Moving list
    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map((item, i) => ({
        ...item,
        order: i
      }));
      const itemsToUpdate = [items[source.index], items[destination.index]];
      setOrderedData(items);
      executeUpdateListsOrder({ items: itemsToUpdate, boardId });
    }
    // Moving card
    if (type === 'card') {
      let newOrderData = [...orderedData];
      const sourceList = newOrderData.find((list) => list.id === source.droppableId);
      const destList = newOrderData.find((list) => list.id === destination.droppableId);
      if (!sourceList || !destList) return;
      // Check if cards exist on the source list
      if (!sourceList.cards) sourceList.cards = [];
      // Check if cards exist on the destination list
      if (!destList.cards) destList.cards = [];
      if (source.droppableId === destination.droppableId) {
        // Moving card in the same list
        const reorderedCards = reorder(sourceList.cards, source.index, destination.index);
        reorderedCards.forEach((card, i) => {
          card.order = i;
        });
        sourceList.cards = reorderedCards;
        setOrderedData(newOrderData);
        executeUpdateCardsOrder({ boardId, items: reorderedCards });
      } else {
        // Moving card in different list
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        movedCard.listId = destination.droppableId;
        destList.cards.splice(destination.index, 0, movedCard);
        sourceList.cards.forEach((card, i) => {
          card.order = i;
        });
        destList.cards.forEach((card, i) => {
          card.order = i;
        });
        setOrderedData(newOrderData);
        executeUpdateCardsOrder({ boardId, items: destList.cards });
      }
    }
  };

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='lists' type='list' direction='horizontal'>
        {({ droppableProps, innerRef, placeholder }) => (
          <ol className={styles['taskslist-container']} {...droppableProps} ref={innerRef}>
            {orderedData.map((list, index) => (
              <TasksList key={list.id} data={list} index={index} />
            ))}
            {placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TasksListContainer;
