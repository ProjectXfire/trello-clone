'use client';

import { type ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useEventListener } from 'usehooks-ts';
import { useAction } from '../../_hooks';
import { updateTasksList } from '../../_actions/update-taskslist';
import styles from './Board.module.css';
import { CustomInput } from '@/shared/components';
import { TasksListOption } from '..';

interface Props {
  id: string;
  boardId: string;
  title: string;
}

function TasksListHeader({ id, boardId, title }: Props): JSX.Element {
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const [currentTitle, setCurrentTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const { execute } = useAction(updateTasksList, {
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: (data) => {
      setCurrentTitle(data.title);
      toast.success(`Renamed to "${data.title}" the title`);
    }
  });

  const enableEditing = (): void => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = (): void => {
    setIsEditing(false);
  };

  const onKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      formRef.current?.requestSubmit();
    }
  };

  const onSubmit = (formData: FormData): void => {
    const newTitle = formData.get('title') as string;
    if (newTitle !== currentTitle) {
      execute({ id, boardId, title: newTitle });
    }
    disableEditing();
  };

  const onBlurSubmit = (): void => {
    formRef.current?.requestSubmit();
  };

  useEventListener('keydown', onKeydown);

  return (
    <header className={styles['taskslist-header']}>
      {isEditing ? (
        <form className={styles['taskslist-form']} ref={formRef} action={onSubmit}>
          <CustomInput
            ref={inputRef}
            name='title'
            placeholder='Enter a title...'
            defaultValue={currentTitle}
            onBlur={onBlurSubmit}
          />
        </form>
      ) : (
        <p onClick={enableEditing}>{currentTitle}</p>
      )}
      <TasksListOption id={id} boardId={boardId} onAddCard={() => {}} />
    </header>
  );
}
export default TasksListHeader;
