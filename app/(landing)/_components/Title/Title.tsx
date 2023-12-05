import styles from './Title.module.css';
import { hexToRgb } from '@/shared/helpers';

interface Props {
  text: string;
  gradient?: [string, string];
  textColor?: string;
}

function Title({ text = 'Untitled', gradient, textColor = 'black' }: Props): JSX.Element {
  return (
    <h1
      className={`${styles.title}`}
      style={{
        color: textColor,
        background: gradient
          ? `linear-gradient(90deg, rgba(${hexToRgb(gradient[0]).r},${hexToRgb(gradient[0]).g},${
              hexToRgb(gradient[0]).b
            },1) 0%, rgba(${hexToRgb(gradient[1]).r},${hexToRgb(gradient[1]).g},${
              hexToRgb(gradient[1]).b
            },1) 100%)`
          : ''
      }}
    >
      {text}
    </h1>
  );
}
export default Title;
