import PageHeading from "@/components/ui/PageHeading";
import Section from "@/components/ui/Section";
import SectionSecondary from "@/components/ui/SectionSecondary";
import Link from "next/link";
import ProcessingInfo from "./_components/ProcessingInfo";
import ProcessingInfoProvider from "./_components/ProcessingInfoProvider";
import ProcessVideo from "./_components/ProcessVideo";
import AiProcessingInfo from "./_components/AiProcessingInfo";

interface Props {
  searchParams: Promise<{ id: string; url: string; title: string }>;
}

export default async function VideoIdPage({ searchParams }: Props) {
  const { id, title, url } = await searchParams;

  if (!id || !title || !url) {
    return (
      <Section>
        <PageHeading>Missing required fields.</PageHeading>
      </Section>
    );
  }

  return (
    <>
      <Section>
        <PageHeading>{title}</PageHeading>
      </Section>

      <Section>
        <Link
          className="inline-block mb-4 underline"
          href={url}
          target="_blank"
        >
          Watch On Youtube
        </Link>
        <div className="relative w-full aspect-video">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://youtube.com/embed/${id}`}
            allowFullScreen
          />
        </div>
      </Section>

      <ProcessingInfoProvider videoId={id} videoTitle={title}>
        <SectionSecondary>
          <ProcessingInfo />
        </SectionSecondary>
        <SectionSecondary>
          <AiProcessingInfo />
        </SectionSecondary>
        <Section>
          <ProcessVideo />
        </Section>
      </ProcessingInfoProvider>
    </>
  );
}
