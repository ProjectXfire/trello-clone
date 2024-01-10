import { Info, SubscriptionButton } from '@/app/(workspace)/_components';
import { Separator } from '@/shared/components';
import { checkSubscription } from '@/shared/lib/subscription';

async function BillingPage(): Promise<JSX.Element> {
  const isPro = await checkSubscription();

  return (
    <div className='pb-4'>
      <Info isProp={isPro} />
      <Separator className='my-4' />
      <SubscriptionButton isPro={isPro} />
    </div>
  );
}
export default BillingPage;
