import { createContext } from "react";

interface SearchPopupContextType {
  isOpen: boolean;
  toggleOpen: () => void;
}

const SearchPopupContext = createContext<SearchPopupContextType>({
  isOpen: false,
  toggleOpen: () => { },
});

export default SearchPopupContext;
