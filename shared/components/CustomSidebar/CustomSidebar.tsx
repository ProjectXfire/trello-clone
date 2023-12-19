'use client';

import { usePathname } from 'next/navigation';
import { Button, Sheet, SheetContent, SheetTrigger } from '@/shared/components';
import { useEffect, useState } from 'react';
import { useSidebar } from '@/shared/states';

function MobileSidebar(): JSX.Element {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const isOpen = useSidebar((s) => s.isOpen);
  const close = useSidebar((s) => s.close);
  const component = useSidebar((s) => s.component);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  if (!isMounted) return <></>;

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent side='left'>{component}</SheetContent>
    </Sheet>
  );
}
export default MobileSidebar;
