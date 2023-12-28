'use client';

import { X } from 'lucide-react';
import { createBoard } from '../../_actions/create-board';
import { useAction } from '../../_hooks/useAction';
import styles from './CreateBoardPopover.module.css';
import {
  CustomInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
  Submit,
  Button
} from '@/shared/components';
import { toast } from 'sonner';

type TSide = 'left' | 'right' | 'top' | 'bottom';
type TAlign = 'start' | 'end' | 'center';

interface Props {
  children: React.ReactNode;
  side?: TSide;
  align?: TAlign;
  sideOffset?: number;
}

function CreateBoardPopover({ children, align, side, sideOffset = 0 }: Props): JSX.Element {
  const { execute, fieldErrors, clearData } = useAction(createBoard, {
    onError: (error) => {
      toast.success(error);
    },
    onSuccess: (data) => {
      toast.error('Board successfully created');
    }
  });

  const onSubmit = (formData: FormData): void => {
    const title = formData.get('title') as string;
    execute({ title });
  };

  const onClosePopover = (): void => {
    clearData();
  };

  return (
    <Popover>
      <PopoverTrigger className='w-full'>{children}</PopoverTrigger>
      <PopoverContent className='w-80 pt-6' side={side} sideOffset={sideOffset} align={align}>
        <div className={styles.content}>Create board</div>
        <PopoverClose asChild>
          <Button
            className='p-1 flex h-auto absolute top-2 right-2'
            variant='ghost'
            size='sm'
            onClick={onClosePopover}
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <form className={styles.form} action={onSubmit}>
          <CustomInput name='title' placeholder='Title' errors={fieldErrors} />
          <Submit>Create</Submit>
        </form>
      </PopoverContent>
    </Popover>
  );
}
export default CreateBoardPopover;
