'use client';

import { useFormStatus } from 'react-dom';
import { type HTMLInputTypeAttribute } from 'react';
import styles from './CustomInput.module.css';
import { Input } from '..';

interface Props {
  name?: string;
  fullWidth?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  errors?: Record<string, string[]>;
}

function CustomInput({ errors, type = 'text', name, placeholder, fullWidth }: Props): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <div className={`${styles['input-group']} ${fullWidth && styles['full-width']}`}>
      <Input
        className={styles.input}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={pending}
      />
      {errors && (
        <>
          {errors.title?.map((error) => (
            <span key={error}>{error}</span>
          ))}
        </>
      )}
    </div>
  );
}
export default CustomInput;
