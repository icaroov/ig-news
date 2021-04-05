import Head from 'next/head'
import styles from './styles.module.scss'

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.postList}>
          <a href="#">
            <time>29 de abril de 2021</time>
            <strong>Titulo do Post</strong>
            <p>Breve parágrafo</p>
          </a>

          <a>
            <time>29 de abril de 2021</time>
            <strong>Titulo do Post</strong>
            <p>Breve parágrafo</p>
          </a>

          <a>
            <time>29 de abril de 2021</time>
            <strong>Titulo do Post</strong>
            <p>Breve parágrafo</p>
          </a>
        </div>
      </main>
    </>
  )
}
