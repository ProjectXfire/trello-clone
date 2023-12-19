'use client';

import NextLink from 'next/link';
import { Plus } from 'lucide-react';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { useLocalStorage } from 'usehooks-ts';
import { type TOrganization } from './SidebarItem';
import styles from './Sidebar.module.css';
import { Button, Skeleton, Accordion } from '@/shared/components';
import { SidebarItem, SidebarSkeleton } from '..';

interface Props {
  storageKey?: string;
  paddingTop?: number;
}

function Sidebar({ storageKey = 't-sidebar-desktop', paddingTop }: Props): JSX.Element {
  const [expanded, setExpanded] = useLocalStorage<Record<string, boolean>>(storageKey, {});
  const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: { infinite: true }
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string): void => {
    setExpanded((cv) => ({ ...cv, [id]: !expanded[id] }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside style={{ paddingTop }}>
      <header className={styles.header}>
        <span className={styles.header__title}>Woskspaces</span>
        <Button className={styles.header__plus} type='button' variant='ghost' asChild>
          <NextLink href='/select-org'>
            <Plus />
          </NextLink>
        </Button>
      </header>
      <Accordion type='multiple' defaultValue={defaultAccordionValue}>
        {userMemberships.data.map(({ organization }) => (
          <SidebarItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as TOrganization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </aside>
  );
}
export default Sidebar;
