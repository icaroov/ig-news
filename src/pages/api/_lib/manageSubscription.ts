import { query as q } from 'faunadb'

import { fauna } from '../../../services/fauna'
import { stripe } from '../../../services/stripe'

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
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

  const updateSubscription = q.Replace(
    q.Select(
      'ref',
      q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId))
    ),
    { data: subscriptionData }
  )

  if (createAction) {
    await fauna.query(saveOnDb)
  } else {
    await fauna.query(updateSubscription)
  }
}
