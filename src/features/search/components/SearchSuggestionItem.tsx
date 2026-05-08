import { useRouter } from "next/navigation";
import useSearchPopup from "../hooks/useSearchPopup";

interface Props {
  activeSuggestion: number;
  id: number;
  value: string;
}

export default function SearchSuggestionItem({
  activeSuggestion,
  id,
  value,
}: Props) {
  const { toggleOpen } = useSearchPopup();
  const router = useRouter();

  function handleClick(e: React.SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault();

    router.push(`/search?q=${value}`);
    toggleOpen();
  }

  const classStr =
    activeSuggestion === id
      ? "block w-full my-1 p-2 bg-background-secondary-border hover:bg-background-secondary-border rounded-full"
      : "block w-full my-1 p-2 bg-background-secondary hover:bg-background-secondary-border rounded-full";

  return (
    <button onClick={handleClick} className={classStr}>
      {value}
    </button>
  );
}
