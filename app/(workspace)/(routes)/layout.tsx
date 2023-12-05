import { Content, Navbar } from '../_components';

interface Props {
  children: React.ReactNode;
}

function WorkspaceLayout({ children }: Props) {
  return (
    <Content>
      <Navbar />
      {children}
    </Content>
  );
}
export default WorkspaceLayout;
