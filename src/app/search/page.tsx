import PageHeading from "@/components/ui/PageHeading";
import Section from "@/components/ui/Section";
import { getSearchResults } from "@/features/search";
import SearchResultItem from "./_components/SearchResultItem";

interface Props {
  searchParams: Promise<{ q: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const results = await getSearchResults(q);

  return (
    <>
      <Section>
        <PageHeading>Results for: {q}</PageHeading>
      </Section>

      <Section>
        {results.map((result) => (
          <SearchResultItem
            key={result.id}
            id={result.id}
            title={result.title}
            url={result.url}
            thumbnailUrl={result.thumbnailUrl}
            duration={result.duration}
            publishedAt={result.publishedAt}
            views={result.views}
          />
        ))}
      </Section>
    </>
  );
}
