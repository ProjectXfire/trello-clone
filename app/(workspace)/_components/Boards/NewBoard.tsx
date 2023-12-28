'use client';

import { HelpCircle } from 'lucide-react';
import styles from './Boards.module.css';
import { Hint } from '@/shared/components';
import { CreateBoardPopover } from '..';

function NewBoard(): JSX.Element {
  return (
    <div className={styles['board-new-container']} role='button'>
      <CreateBoardPopover sideOffset={10} side='right'>
        <div className={styles['board-new']}>
          <p>Create new board</p>
          <span>5 remaining</span>
        </div>
      </CreateBoardPopover>
      <Hint
        description={`Free workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace.`}
        offset={60}
      >
        <HelpCircle className={styles['board-new-info']} />
      </Hint>
    </div>
  );
}
export default NewBoard;
