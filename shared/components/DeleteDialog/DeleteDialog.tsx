import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '..';

interface Props {
  title: string;
  description: string;
  isOpen: boolean;
  action: () => void;
  close: () => void;
  loading?: boolean;
}

function DeleteDialog({ isOpen, action, close, loading, title, description }: Props): JSX.Element {
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='pt-8'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex gap-2 sm:justify-end sm:gap-0'>
          <Button type='button' variant='destructive' disabled={loading} onClick={action}>
            Delete
          </Button>
          <Button type='button' variant='outline' disabled={loading} onClick={close}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteDialog;
