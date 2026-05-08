import Link from "next/link";

interface Props {
  id: string;
  title: string;
  url: string;
  duration: string;
  thumbnailUrl: string;
  publishedAt: string;
  views: string;
}

export default function SearchResultItem({
  id,
  title,
  url,
  duration,
  thumbnailUrl,
  publishedAt,
  views,
}: Props) {
  return (
    <Link
      href={`/video/?id=${id}&title=${title}&url=${url}`}
      className="block flex flex-col my-4 sm:flex-row rounded-xl bg-background-secondary hover:bg-background-secondary-border"
    >
      <div className="p-4">
        <div className="relative w-full sm:w-54 rounded-lg overflow-hidden">
          <img className="w-full" src={thumbnailUrl} alt={title} />
          <p className="absolute bottom-1 end-0 px-2 py-1 text-sm bg-black/70">
            {duration}
          </p>
        </div>
      </div>

      <div className="p-4 sm:pl-0">
        <h3 className="text-xl mb-2">{title}</h3>
        <p>Published {publishedAt}</p>
        <p>{views}</p>
      </div>
    </Link>
  );
}
