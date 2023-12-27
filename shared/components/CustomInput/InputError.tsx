import { XCircle } from 'lucide-react';
import styles from './CustomInput.module.css';

interface Props {
  errors?: Record<string, string[] | undefined>;
  name: string;
}

function InputError({ errors, name }: Props): JSX.Element {
  if (!errors) return <></>;

  return (
    <div id={`${name}-error`} aria-live='polite' className={styles['input-error']}>
      {errors?.[name]?.map((error) => (
        <span key={error}>
          <XCircle size={17} /> {error}
        </span>
      ))}
    </div>
  );
}
export default InputError;
