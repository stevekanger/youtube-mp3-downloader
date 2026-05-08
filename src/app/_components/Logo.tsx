import Link from "next/link";

export default function Logo() {
  return (
    <Link className="hover:opacity-80" href="/">
      <span className="text-red-600">Youtube</span> Mp3 Downloader
    </Link>
  );
}
