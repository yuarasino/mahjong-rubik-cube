import Head from "next/head"
import Cube from "@/components/Cube"
import styles from "@/styles/Index.module.css"

const Index = () => {
  return (
    <>
      <Head>
        <title>麻雀ルービックキューブが遊べるサイト by 新篠ゆう</title>
        <meta
          name="description"
          content="麻雀ルービックキューブが遊べるサイト"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>麻雀ルービックキューブが遊べるサイト</h1>
          <div className={styles.cubeWrapper}>
            <Cube />
          </div>
        </div>
      </main>
    </>
  )
}

export default Index
