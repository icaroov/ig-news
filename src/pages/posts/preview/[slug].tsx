import { GetStaticProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { Session } from 'next-auth'
import { RichText } from 'prismic-dom'

import { getPrismicClient } from '../../../services/prismic'

import styles from '../post.module.scss'
import { useSession } from 'next-auth/client'
import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'

type PostPreviewProps = {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

type SessionProps = {
  activeSubscription?: {
    data: {
      status: string
    }
  }
} & Session

export default function PostPreview({ post }: PostPreviewProps) {
  const [session] = useSession()
  const router = useRouter()

  const customSession: SessionProps = session

  useEffect(() => {
    if (customSession?.activeSubscription) router.push(`/posts/${post.slug}`)
  }, [session])

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.content} ${styles.preview}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href='/'>
              <a>Subscribe Now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('post', String(slug), {})

  const formattedDate = new Date(
    response.last_publication_date
  ).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.slice(0, 2)),
    updatedAt: formattedDate,
  }

  return {
    props: { post },
  }
}
