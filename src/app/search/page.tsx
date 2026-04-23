import PageHeading from "@/components/ui/PageHeading";
import PageWrapper from "@/components/ui/PageWrapper";
import { getSearchResults } from "./_actions/youtube";
import SearchResultItem from "./_components/SearchResultItem";

interface Props {
  searchParams: Promise<{ q: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const results = await getSearchResults(q);

  return (
    <PageWrapper>
      <PageHeading>Results for: {q}</PageHeading>

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
    </PageWrapper>
  );
}
