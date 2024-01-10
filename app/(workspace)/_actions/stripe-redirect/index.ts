'use server';

import { revalidatePath } from 'next/cache';
import { auth, currentUser } from '@clerk/nextjs';
import { type ReturnType, type InputType } from './types';
import { createSafeAction } from '@/shared/lib/createSafeAction';
import { stripe } from '@/shared/lib/stripe';
import db from '@/shared/lib/db';
import { stripeRedirectSchema } from './stripeSchema';
import { absoluteUrl } from '@/shared/helpers';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();
  if (!userId || !orgId || !user) return { error: 'Unauthorized' };
  const settingsUrl = absoluteUrl(`/organization/${orgId}`);
  let url = '';
  try {
    const orgSubscription = await db.orgSubscription.findUnique({ where: { orgId } });
    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl
      });
      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ['card'],
        mode: 'subscription',
        billing_address_collection: 'auto',
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: 'USD',
              product_data: {
                name: 'Taskify Pro',
                description: 'Unlimited boards for your organization'
              },
              unit_amount: 2000,
              recurring: {
                interval: 'month'
              }
            },
            quantity: 1
          }
        ],
        metadata: {
          orgId
        }
      });
      url = stripeSession.url ?? '';
    }
  } catch (error) {
    return { error: 'Something went wrong!' };
  }
  revalidatePath(`/organization/${orgId}`);
  return { data: url };
};

export const stripeRedirect = createSafeAction(stripeRedirectSchema, handler);
