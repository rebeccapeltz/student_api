import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>REST API</title>
        <meta name="description" content="Nextjs app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          REST: Representational State Transition
        </h1>
        <p className={styles.title}>API: Application Programming Interface </p>
        <p>
          <Link href="/students" className={styles.link}>
            Student Registration
          </Link>
        </p>
        <div style={{ position: 'relative', width: '70%', height: '500px' }}>
          {/* <p className={styles.description}>
          A simple REST API built with Next.js
        </p> */}
          <Image src="/rest_api.png" alt="REST API" fill/>
        </div>
        {/*        

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>
      <footer className={styles.footer}>
        <h3>Image Credits</h3>
        <ul>
          <li>
            <a
              href="https://www.flaticon.com/free-icons/server"
              title="server icons"
            >
              Server icons created by juicy_fish - Flaticon
            </a>
          </li>
          <li>
            <a
              href="https://www.flaticon.com/free-icons/computer"
              title="computer icons"
            >
              Computer icons created by Flat Icons - Flaticon
            </a>
          </li>
          <li>
            <a
              href="https://www.flaticon.com/free-icons/database"
              title="database icons"
            >
              Database icons created by The Chohans Brand - Flaticon
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
