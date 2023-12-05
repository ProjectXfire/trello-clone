import { Footer, Layout, Navbar } from '../components';

interface Props {
  children: React.ReactNode;
}

function LandingLayout({ children }: Props) {
  return (
    <Layout>
      <Navbar />
      {children}
      <Footer />
    </Layout>
  );
}
export default LandingLayout;
