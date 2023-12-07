import { OrgControl } from '@/app/(workspace)/_components';

interface Props {
  children: React.ReactNode;
}

function OrganizationDetail({ children }: Props) {
  return (
    <div>
      <OrgControl />
      {children}
    </div>
  );
}
export default OrganizationDetail;
