import { Footer, Layout, Navbar } from '../_components';

interface Props {
  children: React.ReactNode;
}

async function LandingLayout({ children }: Props) {
  return (
    <Layout>
      <Navbar />
      {children}
      <Footer />
    </Layout>
  );
}
export default LandingLayout;
