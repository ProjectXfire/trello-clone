import { OrganizationList } from '@clerk/nextjs';

function OrganizationPage() {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl='/organization/:id'
      afterSelectOrganizationUrl='/organization/:id'
    />
  );
}
export default OrganizationPage;
