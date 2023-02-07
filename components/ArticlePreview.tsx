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
      <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm bg-gray-50">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {month} {day}, {year}
          </span>
          {/* 
          <a
            rel="noopener noreferrer"
            href="#"
            className="px-2 py-1 font-bold rounded bg-rose-600 text-gray-50"
          >
            LABEL_TAG
          </a>
          */}
        </div>
        <div className="mt-3">
          <a
            rel="noopener noreferrer"
            href={`/posts/${slug}`}
            className="text-2xl font-bold hover:underline"
          >
            {title}
          </a>
          <p className="mt-2">{excerpt}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <a
            rel="noopener noreferrer"
            href={`/posts/${slug}`}
            className="hover:underline text-rose-600"
          >
            Read more
          </a>
          {/* 
          <div>
            <a rel="noopener noreferrer" href="#" className="flex items-center">
              <img
                src="https://source.unsplash.com/50x50/?portrait"
                alt="avatar"
                className="object-cover w-10 h-10 mx-4 rounded-full bg-gray-500"
              />
              <span className="hover:underline text-gray-600">
                Adam Dąbrowski
              </span>
            </a>
          </div>
           * */}
        </div>
      </div>
    </div>
  );
}

export default ArticlePreview;
