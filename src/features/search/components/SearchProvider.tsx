import { useState } from "react";
import SearchContext from "../contexts/SearchContext";
import { SearchSuggestion } from "../types";

interface Props {
  children: React.ReactNode;
}

export default function SearchProvider({ children }: Props) {
  const [query, setQuery] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        suggestions,
        setSuggestions,
        activeSuggestion,
        setActiveSuggestion,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
