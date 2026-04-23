import { createContext } from "react";
import { SearchPopupContextType } from "../_types/search";

const SearchPopupContext = createContext<SearchPopupContextType>({
  isOpen: false,
  toggleOpen: () => { },
});

export default SearchPopupContext;
