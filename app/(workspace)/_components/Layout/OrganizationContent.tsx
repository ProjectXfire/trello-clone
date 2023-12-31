import styles from './Layout.module.css';
import { Sidebar } from '..';

interface Props {
  children: React.ReactNode;
}

function OrganizationContent({ children }: Props) {
  return (
    <div className={styles['organization-container']}>
      <div className={styles['organization-content']}>
        <div className={styles['organization-content__sidebar']}>
          <Sidebar />
        </div>
        <div className={styles['organization-content__body']}>{children}</div>
      </div>
    </div>
  );
}
export default OrganizationContent;
