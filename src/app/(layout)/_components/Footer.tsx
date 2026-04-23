export default function Footer() {
  return (
    <div className="relative bg-gray-950 border-t border-gray-800">
      <div className="flex h-16 items-center justify-center">
        &copy; Youtube Mp3 Downloader {new Date().getFullYear()}
      </div>
    </div>
  );
}
