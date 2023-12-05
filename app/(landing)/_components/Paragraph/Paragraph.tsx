import styles from './Paragraph.module.css';

interface Props {
  text: string;
  color?: string;
}

function Paragraph({ text, color = 'black' }: Props): JSX.Element {
  return (
    <p className={styles.paragraph} style={{ color }}>
      {text}
    </p>
  );
}
export default Paragraph;
