import { ClerkProvider } from '@clerk/nextjs';

interface Props {
  children: React.ReactNode;
}

function WorkspaceLayout({ children }: Props) {
  return <main>{children}</main>;
}
export default WorkspaceLayout;
