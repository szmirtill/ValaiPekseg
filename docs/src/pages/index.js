import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          🥖 {siteConfig.title || 'Valai Pékség'}
        </Heading>
        <p className="hero__subtitle">
          {siteConfig.tagline || 'Digitális pékségdokumentáció'}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            📄 Dokumentáció megtekintése
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Főoldal – Valai Pékség"
      description="Online pékség dokumentáció – ASP.NET & React projekt">
      <HomepageHeader />
      <main>
        <div className="container" style={{ textAlign: 'center', padding: '2rem 0' }}>
          <h2>Üdvözlünk a Valai Pékség webdokumentációjában! 🥐</h2>
          <p>
            A Valai Pékség dokumentációs oldala részletes betekintést nyújt abba, hogyan épül fel és működik egy modern, 
            webalapú pékségi rendszer. A projekt célja egy olyan alkalmazás létrehozása, amely egyszerre szolgálja ki a vásárlók 
            igényeit – online rendelés, profilkezelés, kosárfunkció – és az adminisztrációs feladatokat is, például termékek kezelése, 
            rendelések nyomon követése és statisztikák megjelenítése.

            A weboldal ASP.NET és React technológiákra épül, az adatokat egy MySQL adatbázis tárolja, és a rendszer minden funkcióját 
            részletes dokumentációval, képernyőképekkel és példakódokkal mutatjuk be.
          </p>
        </div>
      </main>
    </Layout>
  );
}
