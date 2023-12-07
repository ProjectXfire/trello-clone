import { OrganizationContent } from '@/app/(workspace)/_components';

interface Props {
  children: React.ReactNode;
}

function OrganizationLayout({ children }: Props): JSX.Element {
  return <OrganizationContent>{children}</OrganizationContent>;
}
export default OrganizationLayout;
