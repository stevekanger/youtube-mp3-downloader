"use client";

import { useState } from "react";
import SearchProvider from "./SearchProvider";
import SearchPopupOverlay from "./SearchPopupOverlay";
import SearchPopupContext from "../contexts/SearchPopupContext";
import SearchPopupButton from "./SearchPopupButton";
import SearchForm from "./SearchForm";
import SearchSuggestions from "./SearchSuggestions";

export default function Search() {
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
        <SearchProvider>
          <div className="container">
            <SearchForm />
            <SearchSuggestions />
          </div>
        </SearchProvider>
      </div>
    </SearchPopupContext.Provider>
  );
}
