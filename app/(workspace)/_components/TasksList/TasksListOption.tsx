'use client';

import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useAction } from '../../_hooks';
import { deleteTasksList } from '../../_actions/delete-taskslist';
import { copyTasksList } from '../../_actions/copy-taskslist';
import styles from './Board.module.css';
import { MoreHorizontal, X } from 'lucide-react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  DeleteDialog
} from '@/shared/components';

interface Props {
  id: string;
  boardId: string;
  onAddCard: () => void;
}

function TasksListOption({ id, boardId, onAddCard }: Props): JSX.Element {
  const closePopoverRef = useRef<ElementRef<'button'>>(null);

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const { execute: executeCopy, isLoading: isLoadingCopy } = useAction(copyTasksList, {
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: () => {
      toast.success(`List succesfully copied!`);
      closePopoverRef.current?.click();
    }
  });

  const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(deleteTasksList, {
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: (data) => {
      toast.success(`List "${data.title}" succesfully deleted!`);
    },
    onCompleted: () => {
      setOpenConfirmationDialog(false);
    }
  });

  const onCloseDialog = (): void => {
    setOpenConfirmationDialog(false);
  };

  const onOpenDialog = (): void => {
    setOpenConfirmationDialog(true);
  };

  const onCopyList = (): void => {
    executeCopy({ id, boardId });
  };

  const onDelete = (): void => {
    executeDelete({ id, boardId });
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button size='sm' variant='ghost'>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent side='bottom' align='start'>
          <div className={styles['taskslist-options']}>
            <PopoverClose ref={closePopoverRef}>
              <X className={styles['taskslist-options__close']} />
            </PopoverClose>
            <Button
              type='button'
              size='sm'
              variant='ghost'
              disabled={isLoadingCopy}
              onClick={onAddCard}
            >
              Add card
            </Button>
            <Button
              type='button'
              size='sm'
              variant='ghost'
              disabled={isLoadingCopy}
              onClick={onCopyList}
            >
              Copy list
            </Button>
            <Button
              type='button'
              size='sm'
              variant='destructive'
              disabled={isLoadingCopy}
              onClick={onOpenDialog}
            >
              Delete list
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <DeleteDialog
        isOpen={openConfirmationDialog}
        title='Are you sure to delete this list?'
        description='This action cannot be undone. This will permanently delete your list and remove your
              data from our servers.'
        loading={isLoadingDelete}
        close={onCloseDialog}
        action={onDelete}
      />
    </>
  );
}
export default TasksListOption;
