import Head from "next/head";
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
        <div className="centered-image">
          <img
            srcset="/images/rest_api_375.png 375w, /images/rest_api_800.png 800w"
            sizes="(width <= 600px) 375px,800px"
            src="/images/rest_api_800.png"
            alt="REST API diagram"
          />

        </div>

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
