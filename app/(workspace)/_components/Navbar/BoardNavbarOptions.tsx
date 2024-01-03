'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useAction } from '../../_hooks';
import { deleteBoard } from '../../_actions/delete-board';
import styles from './Navbar.module.css';
import { MoreHorizontal, X } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverClose,
  PopoverContent,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DeleteDialog
} from '@/shared/components';

interface Props {
  id: string;
}

function BoardNavbarOptions({ id }: Props): JSX.Element {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const { execute, isLoading } = useAction(deleteBoard, {
    onSuccess: () => {
      toast.success('Board successfully deleted!');
    },
    onError: () => {
      toast.error('Error on delete board');
    },
    onCompleted: () => {
      onCloseDialog();
    }
  });

  const onDelete = (): void => {
    execute({ id });
  };

  const onCloseDialog = (): void => {
    setOpenConfirmationDialog(false);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='transparent' size='sm'>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-2' side='bottom' align='start'>
          <div className={styles['board-navbar-popover-content']}>
            <PopoverClose className={styles['board-navbar-popover-content__close']}>
              <X className='w-4 h-4' />
            </PopoverClose>
            <Button
              className='w-full'
              size='sm'
              variant='ghost'
              onClick={() => setOpenConfirmationDialog(true)}
            >
              Delete this board
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <DeleteDialog
        isOpen={openConfirmationDialog}
        title='Are you sure to delete this list?'
        description='This action cannot be undone. This will permanently delete your board and remove your
              data from our servers.'
        loading={isLoading}
        close={onCloseDialog}
        action={onDelete}
      />
    </>
  );
}
export default BoardNavbarOptions;
