import { startCase } from 'lodash';
import { OrgControl } from '@/app/(workspace)/_components';
import { auth } from '@clerk/nextjs';

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || 'organization')
  };
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
