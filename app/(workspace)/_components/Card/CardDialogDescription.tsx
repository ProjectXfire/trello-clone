'use client';

import { type ElementRef, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { type ICard } from '../../_interfaces';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { useAction } from '../../_hooks';
import styles from './Card.module.css';
import { AlignLeft } from 'lucide-react';
import { Button, InputError, Skeleton, Submit, Textarea } from '@/shared/components';
import { updateCard } from '../../_actions/update-card';
import { CardActions } from '..';

interface Props {
  data: ICard;
}

function CardDialogDescription({ data }: Props): JSX.Element {
  const textareaRef = useRef<ElementRef<'textarea'>>(null);
  const formRef = useRef<ElementRef<'form'>>(null);
  const params = useParams<{ id: string }>();
  const descriptionRef = useRef(data.description);

  const queryClient = useQueryClient();
  const { execute, fieldErrors, clearData } = useAction(updateCard, {
    onSuccess: (card) => {
      queryClient.invalidateQueries({ queryKey: ['card-logs', card.id] });
      queryClient.invalidateQueries({ queryKey: ['card', card.id] });
      descriptionRef.current = card.description;
      toast.success(`Card "${card.description}" updated`);
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = (): void => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = (): void => {
    setIsEditing(false);
    clearData();
  };

  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  const onSubmit = (formData: FormData): void => {
    const description = formData.get('description') as string;
    if (descriptionRef.current !== description)
      execute({ boardId: params.id, cardId: data.id, description });
    disableEditing();
  };

  useOnClickOutside(formRef, disableEditing);
  useEventListener('keydown', onKeyDown);

  return (
    <div className={styles['card-dialog-description']}>
      <div className={styles['card-dialog-description__title']}>
        <AlignLeft />
        <p>Description</p>
      </div>
      {isEditing ? (
        <form className={styles['card-dialog-description__form']} ref={formRef} action={onSubmit}>
          <Textarea
            className='resize-none'
            ref={textareaRef}
            name='description'
            defaultValue={data.description ?? undefined}
          />
          <InputError name='description' errors={fieldErrors} />
          <div>
            <div>
              <Submit>Save</Submit>
            </div>
            <Button size='sm' variant='ghost' type='button' onClick={disableEditing}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div
          className={styles['card-dialog-description__content']}
          role='button'
          onClick={enableEditing}
        >
          <p>{data.description ?? 'Add a more detailed description...'}</p>
        </div>
      )}
    </div>
  );
}

CardDialogDescription.Skeleton = function DescriptionSkeleton() {
  return (
    <div className='flex items-start gap-x-3 w-full'>
      <Skeleton className='h-6 w-6 bg-neutral-200' />
      <div className='w-full'>
        <Skeleton className='h-6 w-24 mb-2 bg-neutral-200' />
        <Skeleton className='h-[78px] w-full mb-2 bg-neutral-200' />
      </div>
    </div>
  );
};

export default CardDialogDescription;
