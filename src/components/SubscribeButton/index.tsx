import { Session } from 'next-auth'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripeBrowser'

import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

type SessionProps = {
  activeSubscription?: {
    data: {
      status: string
    }
  }
} & Session

export default function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession()
  const router = useRouter()

  const customSession: SessionProps = session

  async function handleSubscribe() {
    if (!customSession) {
      signIn('github')
      return
    }

    if (customSession.activeSubscription) {
      router.push('/posts')
      return
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button
      type='button'
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  )
}
