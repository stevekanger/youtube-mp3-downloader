import LoadingSpinner from "@/components/ui/LoadingSpinner";
import PageHeading from "@/components/ui/PageHeading";
import PageWrapper from "@/components/ui/PageWrapper";

export default function PageLoading() {
  return (
    <PageWrapper>
      <PageHeading>
        <div className="flex items-center justify-center">
          <LoadingSpinner size={24} /> Loading...
        </div>
      </PageHeading>
    </PageWrapper>
  );
}
