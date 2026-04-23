import { useState } from "react";
import SearchContext from "../_contexts/SearchContext";
import { SearchSuggestion } from "../_types/search";
import SearchForm from "./SearchForm";
import SearchSuggestions from "./SearchSuggestions";

export default function Search() {
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
      <div className="container">
        <SearchForm />
        <SearchSuggestions />
      </div>
    </SearchContext.Provider>
  );
}
