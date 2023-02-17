export interface ParsedPostInterface {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  author: {
    name: string;
  };
}

export interface ArticlePreviewType {
  title: string;
  excerpt: string;
  author: string;
  slug: string;
  date: string;
}

export function ArticlePreview({
  title,
  excerpt,
  author,
  date,
  slug,
}: ArticlePreviewType) {
  const rawDate = new Date(date);
  const day = rawDate.getDay();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    rawDate
  );
  const year = rawDate.getFullYear();
  return (
    <div className="bg-gray-100 text-gray-800 rounded-lg mb-2">
      <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm bg-white flex flex-col h-full">
        <span className="text-sm text-gray-600">
          {month} {day}, {year}
        </span>
        <div className="mt-3 grow">
          <a
            rel="noopener noreferrer"
            href={`/posts/${slug}`}
            className="text-2xl font-bold hover:underline"
          >
            {title}
          </a>
          <p className="mt-2">{excerpt}</p>
        </div>
        <a
          rel="noopener noreferrer"
          href={`/posts/${slug}`}
          className="hover:underline text-rose-600 mt-4 inline-block"
        >
          Read more
        </a>
      </div>
    </div>
  );
}

export default ArticlePreview;
