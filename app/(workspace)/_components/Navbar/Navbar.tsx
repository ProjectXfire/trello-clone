import { Button, Logo } from '@/shared/components';
import styles from './Navbar.module.css';
import { Plus } from 'lucide-react';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';

function Navbar(): JSX.Element {
  return (
    <nav className={styles.container}>
      {/* Mobile sidebar */}
      <div className={styles.navbar}>
        <div className={styles['navbar__logo-container']}>
          <div className={styles.navbar__logo}>
            <Logo />
          </div>
          <Button type='button' size='sm' className={styles.navbar__create}>
            Create
          </Button>
          <Button size='sm' type='button' className={styles.navbar__plus}>
            <Plus size={20} />
          </Button>
        </div>
        <div className={styles.navbar__org}>
          <OrganizationSwitcher
            appearance={{ elements: { rootBox: { display: 'flex' } } }}
            hidePersonal
            afterCreateOrganizationUrl='/organization/:id'
            afterSelectOrganizationUrl='/organization/:id'
          />
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
