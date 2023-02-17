import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";
import {
  ParsedPostInterface,
  ArticlePreview,
} from "../components/ArticlePreview";
import { getAllPosts } from "../utils/markdownParse";

export default function Home({ allPosts }: any) {
  return (
  <>
    <Header/>
    <div className={styles.container}>
      <Head>
        <title>Adam Dąbrowski - Software Consultant</title>
        <meta
          name="description"
          content="Consultancy, software engineering blog"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center py-16">
      {/* 
        <div className="border-4 border-black rounded-xl p-4 bg-yellow-100 text-center">
          <h1 className="text-4xl font-bold">Adam Dąbrowski - Sofware Engineer</h1>
          <p>
            Software Engineer building goal-oriented functionalities on front end and back end. Certified Google Cloud Developer.
          </p>
        </div>
      */}
        <h2 className="text-2xl font-semibold mb-4">Most Recent blog posts:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {allPosts.map((article: ParsedPostInterface) => (
            <ArticlePreview
              key={article.date}
              title={article.title}
              excerpt={article.excerpt}
              author={article.author.name}
              slug={article.slug}
              date={article.date}
            />
          ))}
        </div>

        {/*
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
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
        */}
      </main>
    </div>
    <Footer />
  </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
