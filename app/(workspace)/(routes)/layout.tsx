import { CustomSidebar } from '@/shared/components';
import { MainContent, Navbar } from '../_components';

interface Props {
  children: React.ReactNode;
}

function WorkspaceLayout({ children }: Props) {
  return (
    <MainContent>
      <Navbar />
      <CustomSidebar />
      {children}
    </MainContent>
  );
}
export default WorkspaceLayout;
