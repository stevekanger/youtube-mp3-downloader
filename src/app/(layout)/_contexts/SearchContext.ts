import { createContext } from "react";
import { SearchContextType } from "../_types/search";

const SearchContext = createContext<SearchContextType>({
  query: "",
  setQuery: () => { },
  suggestions: [],
  setSuggestions: () => { },
  activeSuggestion: -1,
  setActiveSuggestion: () => { },
});

export default SearchContext;
