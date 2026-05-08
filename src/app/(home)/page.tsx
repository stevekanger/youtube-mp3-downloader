import { MusicalNoteIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <div className="relative flex-1 flex flex-col items-center justify-center">
      <div className="absolute z-0 text-background-secondary">
        <MusicalNoteIcon className="size-98" />
      </div>
    </div>
  );
}
