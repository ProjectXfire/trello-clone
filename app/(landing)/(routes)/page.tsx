import { Medal } from 'lucide-react';
import { Content, Header, Paragraph, Signup, Title } from '../components';

export default function LandingPage() {
  return (
    <Content>
      <Header
        icon={<Medal />}
        text='NO1 TASK MANAGEMENT'
        color='var(--slate-light)'
        bgColor='var(--slate-dark)'
      />
      <Title text='Taskify helps teams move' />
      <Title text='work forward.' gradient={['#bfdbfe', '#1e3a8a']} textColor='white' />
      <Paragraph
        color='var(--slate-dark)'
        text='Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with Taskify.'
      />
      <Signup />
    </Content>
  );
}
