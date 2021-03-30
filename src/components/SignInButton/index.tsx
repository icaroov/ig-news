import { FaGithub as GithubIcon } from 'react-icons/fa'
import { FiX as CloseIcon } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/client'

import styles from './styles.module.scss'

export default function SignInButton() {
  const [session] = useSession()

  return session ? (
    <button
      type='button'
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <GithubIcon color='#04d361' />
      {session.user.name}
      <CloseIcon color='#737380' className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type='button'
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
      <GithubIcon color='#eba417' />
      Sign in with Github
    </button>
  )
}
