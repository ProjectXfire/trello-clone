import { auth } from '@clerk/nextjs';
import { Footer, Layout, Navbar } from '../components';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

async function LandingLayout({ children }: Props) {
  const { userId } = auth();

  if (userId) redirect('/workspace');

  return (
    <Layout>
      <Navbar />
      {children}
      <Footer />
    </Layout>
  );
}
export default LandingLayout;
