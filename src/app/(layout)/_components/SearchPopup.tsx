"use client";

import { useState } from "react";
import SearchProvider from "./Search";
import SearchPopupOverlay from "./SearchPopupOverlay";
import SearchPopupContext from "../_contexts/SearchPopupContext";
import SearchPopupButton from "./SearchPopupButton";

export default function SearchPopup() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((cur) => !cur);
  }

  function getClassname() {
    return isOpen
      ? "fixed flex flex-col top-0 left-0 z-20 w-full h-full p-4"
      : "hidden fixed flex flex-col top-0 left-0 z-20 w-full h-full p-4";
  }

  return (
    <SearchPopupContext.Provider value={{ isOpen, toggleOpen }}>
      <SearchPopupButton />
      <div className={getClassname()}>
        <SearchPopupOverlay />
        <SearchProvider />
      </div>
    </SearchPopupContext.Provider>
  );
}
