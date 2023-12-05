import { Content } from '../_components';

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  return <Content>{children}</Content>;
}
export default AuthLayout;
