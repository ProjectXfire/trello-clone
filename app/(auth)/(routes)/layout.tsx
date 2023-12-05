import { ClerkProvider } from '@clerk/nextjs';
import { Content } from '../components';

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  return <Content>{children}</Content>;
}
export default AuthLayout;
