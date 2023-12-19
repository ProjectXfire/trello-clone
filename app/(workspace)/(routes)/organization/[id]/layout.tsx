import { OrgControl } from '@/app/(workspace)/_components';

interface Props {
  children: React.ReactNode;
}

function OrganizationDetail({ children }: Props) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}
export default OrganizationDetail;
