'use client';

import { type ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { type Board } from '@prisma/client';
import { createBoard } from '../../_actions/update-board';
import { useAction } from '../../_hooks';
import styles from './UpdateBoard.module.css';
import { Button, CustomInput } from '@/shared/components';

interface Props {
  data: Board;
}

function UpdateTitle({ data }: Props): JSX.Element {
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);

  const { execute } = useAction(createBoard, {
    onSuccess: (data) => {
      setTitle(data.title);
      toast.success(`Board "${data.title}" updated!`);
    },
    onError: () => {
      toast.error('Something went wrong!');
    },
    onCompleted: () => {
      disableEditing();
    }
  });

  const disableEditing = (): void => {
    setIsEditing(false);
  };

  const enableEditing = (): void => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onSubmit = (formData: FormData): void => {
    const newTtitle = formData.get('title') as string;
    if (title === newTtitle) {
      disableEditing();
      return;
    }
    execute({ id: data.id, title: newTtitle });
  };

  const onBlurSubmit = (): void => {
    formRef.current?.requestSubmit();
  };

  if (isEditing)
    return (
      <form className={styles.form} ref={formRef} action={onSubmit}>
        <CustomInput
          ref={inputRef}
          name='title'
          defaultValue={title}
          transparent
          onBlur={onBlurSubmit}
        />
      </form>
    );

  return (
    <Button variant='transparent' onClick={enableEditing}>
      {data.title}
    </Button>
  );
}
export default UpdateTitle;
