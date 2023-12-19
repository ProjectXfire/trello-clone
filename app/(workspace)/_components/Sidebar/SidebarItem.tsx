'use client';

import { useRouter, usePathname } from 'next/navigation';
import NextImage from 'next/image';
import styles from './Sidebar.module.css';
import { Activity, CreditCard, Layout, Settings } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger, Button } from '@/shared/components';

export type TOrganization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

type IOrgItemRoutes = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

interface Props {
  isActive: boolean;
  isExpanded: boolean;
  organization: TOrganization;
  onExpand: (id: string) => void;
}

function SidebarItem({ isActive, isExpanded, onExpand, organization }: Props): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();

  const routes: IOrgItemRoutes[] = [
    { label: 'Boards', icon: <Layout size={20} />, href: `/organization/${organization.id}` },
    {
      label: 'Activity',
      icon: <Activity size={20} />,
      href: `/organization/${organization.id}/activity`
    },
    {
      label: 'Settings',
      icon: <Settings size={20} />,
      href: `/organization/${organization.id}/settings`
    },
    {
      label: 'Billing',
      icon: <CreditCard size={20} />,
      href: `/organization/${organization.id}/billing`
    }
  ];

  const expand = () => {
    onExpand(organization.id);
  };

  const onNavigate = (href: string): void => {
    router.push(href);
  };

  return (
    <AccordionItem className='border-none' value={organization.id}>
      <AccordionTrigger
        className={`${styles['sidebar-item-trigger']} ${
          isActive && !isExpanded && styles['is-active']
        }`}
        onClick={expand}
      >
        <div className={styles['sidebar-item-header']}>
          <div className={styles['sidebar-item-header__img']}>
            <NextImage
              src={organization.imageUrl}
              fill
              alt={organization.name}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
          <p>{organization.name}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {routes.map((route) => (
          <Button
            key={route.label}
            className={`${styles['sidebar-subitem']} ${
              pathname === route.href && styles['is-active']
            }`}
            variant='ghost'
            type='button'
            size='sm'
            onClick={() => onNavigate(route.href)}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

export default SidebarItem;
