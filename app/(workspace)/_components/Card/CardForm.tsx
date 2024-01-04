'use client';

import { type ElementRef, forwardRef, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { toast } from 'sonner';
import { useAction } from '../../_hooks';
import { createCard } from '../../_actions/create-card';
import styles from './Card.module.css';
import { Plus, X } from 'lucide-react';
import { Button, InputError, Submit, Textarea } from '@/shared/components';

interface Props {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

const CardForm = forwardRef<HTMLTextAreaElement, Props>(
  ({ listId, disableEditing, enableEditing, isEditing }, ref) => {
    const params = useParams<{ id: string }>();
    const formRef = useRef<ElementRef<'form'>>(null);

    const { execute, fieldErrors, clearData, isLoading } = useAction(createCard, {
      onError: (error) => {
        toast.error(error);
      },
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" successfully created!`);
        disableEditing();
      }
    });

    const onCancelForm = (): void => {
      disableEditing();
      clearData();
    };

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        disableEditing();
        clearData();
      }
    };

    const onTextareaEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
      if (e.key === 'Enter' && !e.shiftKey) {
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      if (formRef.current) {
        const data = new FormData(formRef.current);
        const title = data.get('title') as string;
        execute({ title, listId, boardId: params.id });
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener('keydown', onKeyDown);

    return (
      <div className={styles['card-form-container']}>
        {isEditing ? (
          <form onSubmit={onSubmit} ref={formRef}>
            <Textarea
              ref={ref}
              name='title'
              className='resize-none'
              onKeyDown={onTextareaEnter}
              placeholder='Enter a title for this card...'
              aria-describedby='title-error'
              disabled={isLoading}
            />
            <InputError name='title' errors={fieldErrors} />
            <div className={styles['card-form-container__actions']}>
              <Submit disabled={isLoading}>Add a card</Submit>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                disabled={isLoading}
                onClick={onCancelForm}
              >
                <X className='h-5 w-5' />
              </Button>
            </div>
          </form>
        ) : (
          <Button
            className='w-full justify-start'
            variant='ghost'
            size='sm'
            type='button'
            onClick={enableEditing}
          >
            <Plus className='w-4 h-4 mr-2' /> Add a card
          </Button>
        )}
      </div>
    );
  }
);

CardForm.displayName = 'CardForm';

export default CardForm;
