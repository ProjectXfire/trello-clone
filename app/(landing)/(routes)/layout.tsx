interface Props {
  children: React.ReactNode;
}

function LandingPage({ children }: Props) {
  return <div>{children}</div>;
}
export default LandingPage;
