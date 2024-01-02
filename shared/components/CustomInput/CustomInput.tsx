'use client';

import { useFormStatus } from 'react-dom';
import { forwardRef, type HTMLInputTypeAttribute } from 'react';
import styles from './CustomInput.module.css';
import { Input, InputError } from '..';

interface Props {
  defaultValue?: string;
  name: string;
  fullWidth?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  errors?: Record<string, string[] | undefined>;
  required?: boolean;
  disabled?: boolean;
  onBlur?: () => void;
  transparent?: boolean;
}

const CustomInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      errors,
      type = 'text',
      name,
      placeholder,
      fullWidth,
      required,
      onBlur,
      defaultValue,
      disabled,
      transparent
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className={`${styles['input-group']} ${fullWidth && styles['full-width']}`}>
        <Input
          className={`${styles.input} ${transparent && styles['input-transparent']}`}
          defaultValue={defaultValue}
          ref={ref}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          disabled={pending || disabled}
          required={required}
          onBlur={onBlur}
          aria-describedby={`${name}-error`}
        />
        <InputError errors={errors} name={name} />
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
