import Head from "next/head";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { remark } from "remark";
import html from "remark-html";
import postStyles from "../../styles/Post.module.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getPostBySlug, getAllPosts } from "../../utils/markdownParse";

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

type Author = {
  name: string;
  picture?: string;
};

type PostType = {
  slug: string;
  title: string;
  date: string;
  author: Author;
  excerpt: string;
  content: string;
};

type Params = {
  params: {
    slug: string;
  };
};

type Props = {
  post: PostType;
};

const Post = ({ post }: Props) => {
  const router = useRouter();
  const postDateFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const postDateFormatted: string = new Intl.DateTimeFormat(
    "en-US",
    postDateFormatOptions
  ).format(new Date(post.date));

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{`${post.title} | Adam Dąbrowski - Blog`}</title>
        <meta name="description" content="Software engineering blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <Header />
            <article className="mb-32 max-w-3xl m-auto">
              <p className="m-4 text-sm font-thin">{postDateFormatted}</p>
              <div
                className={postStyles.post}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Post;

// TODO footer link to about me page

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
