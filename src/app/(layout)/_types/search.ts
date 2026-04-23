export interface SearchPopupContextType {
  isOpen: boolean;
  toggleOpen: () => void;
}

export interface SearchContextType {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  suggestions: SearchSuggestion[];
  setSuggestions: React.Dispatch<React.SetStateAction<SearchSuggestion[]>>;
  activeSuggestion: number;
  setActiveSuggestion: React.Dispatch<React.SetStateAction<number>>;
}

export interface SearchSuggestion {
  id: number;
  value: string;
}
