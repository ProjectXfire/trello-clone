'use client';

import { useDialog } from '@/shared/states';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '..';

function CustomDialog(): JSX.Element {
  const isOpen = useDialog((s) => s.isOpen);
  const close = useDialog((s) => s.close);
  const component = useDialog((s) => s.component);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='pt-8'>{component}</DialogContent>
    </Dialog>
  );
}
export default CustomDialog;
