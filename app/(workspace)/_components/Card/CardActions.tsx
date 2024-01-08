'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { type ICard } from '../../_interfaces';
import { useDialog } from '@/shared/states';
import { deleteCard } from '../../_actions/delete-card';
import { useAction } from '../../_hooks';
import styles from './Card.module.css';
import { Copy, Trash } from 'lucide-react';
import { Button, DeleteDialog, Skeleton } from '@/shared/components';
import { copyCard } from '../../_actions/copy-card';

interface Props {
  data: ICard;
}

function CardActions({ data }: Props): JSX.Element {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const close = useDialog((s) => s.close);
  const params = useParams<{ id: string }>();

  const { execute: executeDelete, isLoading } = useAction(deleteCard, {
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" successfully deleted!`);
      onCloseDialog();
      close();
    }
  });

  const { execute: executeCopy, isLoading: isLoadingCopy } = useAction(copyCard, {
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: (data) => {
      toast.success(`card "${data.title}" successfully copied`);
    }
  });

  const onDeleteCard = (): void => {
    executeDelete({ cardId: data.id, boardId: params.id });
  };

  const onOpenDialog = (): void => {
    setOpenDeleteDialog(true);
  };

  const onCloseDialog = (): void => {
    setOpenDeleteDialog(false);
  };

  const onCopyCard = (): void => {
    executeCopy({ boardId: params.id, cardId: data.id });
  };

  return (
    <>
      <div className={styles['card-dialog-actions-container']}>
        <p>Actions</p>
        <div className={styles['card-dialog-actions']}>
          <Button variant='grey' size='inline' disabled={isLoadingCopy} onClick={onCopyCard}>
            <Copy className='w-4 h-4' /> Copy
          </Button>
          <Button variant='grey' size='inline' disabled={isLoadingCopy} onClick={onOpenDialog}>
            <Trash className='w-4 h-4' /> Delete
          </Button>
        </div>
      </div>
      <DeleteDialog
        isOpen={openDeleteDialog}
        title='Are you sure to delete this card?'
        description='This action cannot be undone. This will permanently delete your card and remove your
              data from our servers.'
        loading={isLoading}
        close={onCloseDialog}
        action={onDeleteCard}
      />
    </>
  );
}

CardActions.Skeleton = function actionsSkeleton() {
  return (
    <div className='space-y-2 mt-2'>
      <Skeleton className='w-20 h-4 bg-neutral-200' />
      <Skeleton className='w-full h-8 bg-neutral-200' />
      <Skeleton className='w-full h-8 bg-neutral-200' />
    </div>
  );
};

export default CardActions;
