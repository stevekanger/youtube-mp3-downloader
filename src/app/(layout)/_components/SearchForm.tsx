import debounce from "@/utils/debounce";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { getSearchSuggestions } from "../_actions/suggestions";
import useSearch from "../_hooks/useSearch";
import useSearchPopup from "../_hooks/useSearchPopup";

const SUGGESTIONS_DEBOUNCE_TIMEOUT = 200;

export default function SearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, setQuery, setSuggestions, setActiveSuggestion } = useSearch();
  const { isOpen, toggleOpen } = useSearchPopup();
  const router = useRouter();
  const debouncedUpdateSuggestions = useRef(
    debounce(updateSuggestions, SUGGESTIONS_DEBOUNCE_TIMEOUT),
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    router.push(`/search?q=${query}`);
    toggleOpen();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    debouncedUpdateSuggestions.current(q);
  }

  async function updateSuggestions(query: string) {
    const suggestions = await getSearchSuggestions(query);
    setSuggestions(suggestions);
    setActiveSuggestion(-1);
  }

  return (
    <form
      className="flex item-center w-full relative mx-2 ml-auto"
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        type="text"
        id="query"
        value={query}
        onChange={handleChange}
        className="block w-full text-foreground-light text-xl h-16 px-4 bg-background-light border border-gray-800 text-heading text-sm rounded-l-full focus:outline-none focus:border-gray-600 shadow-xs placeholder:text-body"
        placeholder="Search"
        autoComplete="off"
        required
      />
      <button
        type="submit"
        className="flex items-center justify-center text-xl h-16 px-6 bg-gray-800 rounded-r-full hover:bg-gray-600 focus:outline-none"
      >
        Search
      </button>
    </form>
  );
}
