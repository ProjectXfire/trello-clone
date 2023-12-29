import { Button, Logo } from '@/shared/components';
import styles from './Navbar.module.css';
import { Plus } from 'lucide-react';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { CreateBoardPopover, NavbarOpenMenu } from '..';

function Navbar(): JSX.Element {
  return (
    <nav className={styles.container}>
      <NavbarOpenMenu />
      <div className={styles.navbar}>
        <div className={styles['navbar__logo-container']}>
          <div className={styles.navbar__logo}>
            <Logo />
          </div>
          <CreateBoardPopover align='start' side='bottom' sideOffset={18}>
            <div role='button' className={styles.navbar__create}>
              Create
            </div>
          </CreateBoardPopover>
          <CreateBoardPopover align='start' side='bottom' sideOffset={18}>
            <div className={styles.navbar__plus}>
              <Plus size={20} />
            </div>
          </CreateBoardPopover>
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
