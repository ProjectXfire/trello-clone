'use client';

import { type IList } from '../../_interfaces';
import styles from './Board.module.css';
import { TasksList } from '..';
import { useEffect, useState } from 'react';

interface Props {
  boardId: string;
  data: IList[];
}

function TasksListContainer({ boardId, data }: Props) {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol className={styles['taskslist-container']}>
      {orderedData.map((list, index) => (
        <TasksList key={list.id} data={list} index={index} />
      ))}
    </ol>
  );
}

export default TasksListContainer;
