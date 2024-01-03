'use client';

import { useParams } from 'next/navigation';
import { type ElementRef, useRef, useState } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { toast } from 'sonner';
import { useAction } from '../../_hooks';
import { createTasksList } from '../../_actions/create-taskslist';
import styles from './CreateTasksList.module.css';
import { Plus, X } from 'lucide-react';
import { Button, CustomInput, Submit } from '@/shared/components';

function AddTasksList(): JSX.Element {
  const params = useParams<{ id: string }>();
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { execute, fieldErrors, clearData, isLoading } = useAction(createTasksList, {
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: (data) => {
      toast.success(`List "${data.title}" successfully created!`);
    },
    onCompleted: () => {
      disableEditing();
    }
  });

  const enableEditing = (): void => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = (): void => {
    setIsEditing(false);
    clearData();
  };

  const onKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    execute({ title, id: params.id });
  };

  useEventListener('keydown', onKeydown);
  useOnClickOutside(formRef, disableEditing);

  return (
    <div className={styles.container}>
      {isEditing ? (
        <form className={`${styles.form}`} ref={formRef} action={onSubmit}>
          <CustomInput
            ref={inputRef}
            name='title'
            placeholder='Enter list title...'
            errors={fieldErrors}
          />
          <input type='text' readOnly hidden value={params.id} name='boardId' />
          <div className={styles.form__actions}>
            <Submit>Add List</Submit>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              disabled={isLoading}
              onClick={disableEditing}
            >
              <X className='w-5 h-5' />
            </Button>
          </div>
        </form>
      ) : (
        <Button className={styles['open-form']} onClick={enableEditing}>
          <Plus className='w-5 h-5 mr-2' />
          Add a list
        </Button>
      )}
    </div>
  );
}
export default AddTasksList;
