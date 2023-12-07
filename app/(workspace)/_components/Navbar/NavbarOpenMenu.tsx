'use client';

import styles from './Navbar.module.css';
import { Button } from '@/shared/components';
import { useSidebar } from '@/shared/states';
import { Menu } from 'lucide-react';
import { Sidebar } from '..';

function NavbarOpenMenu(): JSX.Element {
  const open = useSidebar((s) => s.open);
  const setComponent = useSidebar((s) => s.setComponent);

  const onOpenMenu = (): void => {
    setComponent(<Sidebar storageKey='t-sidebar-mobile' paddingTop={30} />);
    open();
  };

  return (
    <Button className={styles.navbar__menu} type='button' variant='ghost' onClick={onOpenMenu}>
      <Menu />
    </Button>
  );
}
export default NavbarOpenMenu;
