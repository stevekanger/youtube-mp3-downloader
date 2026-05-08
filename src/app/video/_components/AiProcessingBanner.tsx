import Link from "next/link";

export default function AiProcessingBanner() {
  return (
    <div className="text-center">
      <p>You can have ai fill in metadata.</p>
      <Link
        className="inline-block my-2 py-1 px-4 bg-primary hover:bg-primary-hover rounded-full"
        href="/faq"
      >
        Find Out How
      </Link>
    </div>
  );
}
