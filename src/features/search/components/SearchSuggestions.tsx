import { useEffect } from "react";
import useSearch from "../hooks/useSearch";
import useSearchPopup from "../hooks/useSearchPopup";
import SearchSuggestionItem from "./SearchSuggestionItem";

export default function SearchSuggestions() {
  const {
    setQuery,
    suggestions,
    setSuggestions,
    activeSuggestion,
    setActiveSuggestion,
  } = useSearch();

  const { isOpen } = useSearchPopup();

  function clearSuggestions() {
    setSuggestions([]);
    setActiveSuggestion(-1);
  }

  function changeActiveSuggestion(id: number) {
    const newId = Math.max(Math.min(suggestions.length - 1, id), -1);
    setActiveSuggestion(newId);

    if (suggestions[newId]) {
      setQuery(suggestions[newId].value);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        changeActiveSuggestion(activeSuggestion + 1);
        return;
      case "ArrowUp":
        e.preventDefault();
        changeActiveSuggestion(activeSuggestion - 1);
        return;
      case "Escape":
        e.preventDefault();
        setSuggestions([]);
        return;
      default:
        return;
    }
  }

  useEffect(() => {
    if (!isOpen) {
      clearSuggestions();
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [activeSuggestion, suggestions]);

  return (
    <div className="relative max-h-[calc(100vh-112px)] my-4 bg-gray-950 overflow-y-auto">
      {suggestions.map((suggestion) => (
        <SearchSuggestionItem
          key={suggestion.id}
          activeSuggestion={activeSuggestion}
          id={suggestion.id}
          value={suggestion.value}
        />
      ))}
    </div>
  );
}
