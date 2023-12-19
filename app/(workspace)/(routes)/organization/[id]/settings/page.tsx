import { OrganizationProfile } from '@clerk/nextjs';

function SettingsPage(): JSX.Element {
  return (
    <OrganizationProfile
      appearance={{
        elements: {
          rootBox: { width: '100%', boxShadow: 'none' },
          card: { width: '100%', boxShadow: 'none', border: '1.5px solid var(--color1)' }
        }
      }}
    />
  );
}
export default SettingsPage;
