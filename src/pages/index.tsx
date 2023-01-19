import Head from "next/head"
import Cube from "@/components/Cube"
import styles from "@/styles/Index.module.css"

const Index = () => {
  return (
    <>
      <Head>
        <title>麻雀ルービックキューブ by 新篠ゆう</title>
        <meta
          name="description"
          content="麻雀ルービックキューブが遊べるサイト"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>麻雀ルービックキューブ by 新篠ゆう</h1>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <Cube />
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.copy}>&copy; 新篠ゆう</p>
        </div>
      </footer>
    </>
  )
}

export default Index
