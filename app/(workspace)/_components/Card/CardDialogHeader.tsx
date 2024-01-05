'use client';

import { useParams } from 'next/navigation';
import { type ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { type ICard } from '../../_interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { useAction } from '../../_hooks';
import { updateCard } from '../../_actions/update-card';
import styles from './Card.module.css';
import { Layout, Edit } from 'lucide-react';
import { CustomInput, Skeleton } from '@/shared/components';

interface Props {
  data: ICard;
}

function CardDialogHeader({ data }: Props): JSX.Element {
  const queryClient = useQueryClient();
  const params = useParams<{ id: string }>();
  const inputRef = useRef<ElementRef<'input'>>(null);
  const { execute } = useAction(updateCard, {
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['card', data.id] });
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
    }
  });

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = (value: boolean): void => {
    if (!value) onBlur();
    setIsEditing(value);
  };

  const onBlur = (): void => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData): void => {
    const newTitle = formData.get('title') as string;
    if (title !== newTitle) execute({ title: newTitle, boardId: params.id, cardId: data.id });
    setIsEditing(false);
  };

  return (
    <div className={styles['card-dialog-header']}>
      <form action={onSubmit}>
        <Layout className='w-8 h-8' />
        <CustomInput
          ref={inputRef}
          name='title'
          disabled={!isEditing}
          defaultValue={title}
          fullWidth
          onBlur={onBlur}
        />
        <Edit
          className={`${styles['card-dialog-header__edit']} ${
            isEditing
              ? styles['card-dialog-header__edit--enable']
              : styles['card-dialog-header__edit--disable']
          }`}
          onClick={() => toggleEditing(!isEditing)}
        />
      </form>
      <p className={styles['card-dialog-header__subtitle']}>
        In list <strong>{data.list?.title}</strong>
      </p>
    </div>
  );
}

CardDialogHeader.Skeleton = function HeaderSkeleton() {
  return (
    <div className='flex items-start gap-x-3 mb-6'>
      <Skeleton className='h-8 w-8 mt-1 bg-neutral-200' />
      <div>
        <Skeleton className='w-24 h-6 mb-1 bg-neutral-200' />
        <Skeleton className='w-12 h-6 bg-neutral-200' />
      </div>
    </div>
  );
};

export default CardDialogHeader;
