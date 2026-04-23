import { useContext } from "react";
import SearchPopupContext from "../_contexts/SearchPopupContext";

export default function useSearchPopup() {
  const { isOpen, toggleOpen } = useContext(SearchPopupContext);

  return { isOpen, toggleOpen };
}
