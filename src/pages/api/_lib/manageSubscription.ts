import { query as q } from 'faunadb'

import { fauna } from '../../../services/fauna'
import { stripe } from '../../../services/stripe'

export async function saveSubscription(
  subscriptionId: string,
  customerId: string
) {
  const getUserRef = q.Select(
    'ref',
    q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId))
  )

  const userRef = await fauna.query(getUserRef)

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  const saveOnDb = q.Create(q.Collection('subscriptions'), {
    data: subscriptionData,
  })

  await fauna.query(saveOnDb)
}
