import { useRouter } from "next/navigation";
import useSearchPopup from "../_hooks/useSearchPopup";

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
      ? "block w-full my-1 p-2 bg-gray-700 hover:bg-gray-700 rounded-full"
      : "block w-full my-1 p-2 bg-gray-900 hover:bg-gray-700 rounded-full";

  return (
    <button onClick={handleClick} className={classStr}>
      {value}
    </button>
  );
}
