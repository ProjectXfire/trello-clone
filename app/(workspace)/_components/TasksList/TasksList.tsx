'use client';

import { type IList } from '../../_interfaces';
import styles from './Board.module.css';
import { TasksListHeader } from '..';

interface Props {
  index: number;
  data: IList;
}

function TasksList({ index, data }: Props): JSX.Element {
  return (
    <li className={styles['taskslist']}>
      <TasksListHeader title={data.title} id={data.id} boardId={data.boardId} />
      <div>Cards</div>
    </li>
  );
}
export default TasksList;
