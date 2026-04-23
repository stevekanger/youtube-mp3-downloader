import PageHeading from "@/components/ui/PageHeading";
import PageWrapper from "@/components/ui/PageWrapper";
import Processing from "./_components/Processing";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ id: string; url: string; title: string }>;
}

export default async function VideoIdPage({ searchParams }: Props) {
  const { id, title, url } = await searchParams;

  if (!id || !title || !url) {
    return (
      <PageWrapper>
        <PageHeading>Missing required fields.</PageHeading>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageHeading>{title}</PageHeading>

      <p className="my-4">
        Watch on youtube{" "}
        <Link className="underline" href={url} target="_blank">
          Here
        </Link>
      </p>

      <div className="relative my-4 w-full aspect-video">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://youtube.com/embed/${id}`}
          allowFullScreen
        />
      </div>

      <Processing id={id} title={title} />
    </PageWrapper>
  );
}
