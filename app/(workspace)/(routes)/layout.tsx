import { Toaster } from 'sonner';
import { CustomDialog, CustomSidebar, Providers } from '@/shared/components';
import { MainContent, Navbar } from '../_components';

interface Props {
  children: React.ReactNode;
}

function WorkspaceLayout({ children }: Props) {
  return (
    <MainContent>
      <Providers>
        <Navbar />
        <CustomSidebar />
        <CustomDialog />
        <Toaster />
        {children}
      </Providers>
    </MainContent>
  );
}
export default WorkspaceLayout;
