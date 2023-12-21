'use client';

import styles from './CreateForm.module.css';
import { Button, CustomInput } from '@/shared/components';
import { createBoard } from '../../_actions/create-board';
import { useAction } from '../../_hooks/useAction';

function CreateForm(): JSX.Element {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error)
  });

  const onSubmit = (formData: FormData): void => {
    const title = formData.get('title') as string;
    execute({ title });
  };

  return (
    <form className={styles.form} action={onSubmit}>
      <CustomInput name='title' fullWidth placeholder='Title' errors={fieldErrors} type='text' />
      <Button type='submit'>Create</Button>
    </form>
  );
}
export default CreateForm;
