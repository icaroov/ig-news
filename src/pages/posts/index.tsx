import { GetStaticProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import styles from './styles.module.scss'
import { getPrismicClient } from '../../services/prismic'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.postList}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 100,
    }
  )

  const posts = response.results.map((post) => {
    const getFirstParagraph =
      post.data.content.find((content) => content.type === 'paragraph')?.text ??
      ''
    const formattedDate = new Date(
      post.last_publication_date
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })

    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: getFirstParagraph,
      updatedAt: formattedDate,
    }
  })

  return {
    props: { posts },
  }
}
