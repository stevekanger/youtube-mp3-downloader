import { createContext } from "react";
import { SearchSuggestion } from "../types";

interface SearchContextType {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  suggestions: SearchSuggestion[];
  setSuggestions: React.Dispatch<React.SetStateAction<SearchSuggestion[]>>;
  activeSuggestion: number;
  setActiveSuggestion: React.Dispatch<React.SetStateAction<number>>;
}

const SearchContext = createContext<SearchContextType>({
  query: "",
  setQuery: () => { },
  suggestions: [],
  setSuggestions: () => { },
  activeSuggestion: -1,
  setActiveSuggestion: () => { },
});

export default SearchContext;
