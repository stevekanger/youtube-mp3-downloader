import { useContext } from "react";
import SearchContext from "../contexts/SearchContext";

export default function useSearch() {
  const {
    query,
    setQuery,
    suggestions,
    setSuggestions,
    activeSuggestion,
    setActiveSuggestion,
  } = useContext(SearchContext);

  return {
    query,
    setQuery,
    suggestions,
    setSuggestions,
    activeSuggestion,
    setActiveSuggestion,
  };
}
