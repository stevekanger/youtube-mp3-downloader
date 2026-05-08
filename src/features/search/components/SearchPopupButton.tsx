import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useSearchPopup from "../hooks/useSearchPopup";

export default function SearchPopupButton() {
  const { isOpen, toggleOpen } = useSearchPopup();

  return (
    <button
      onClick={toggleOpen}
      className="fixed flex items-center justify-center z-30 right-4 bottom-4 w-20 h-20 bg-background-secondary hover:bg-background-secondary-border border border-background-secondary-border rounded-full cursor-pointer"
    >
      {isOpen ? (
        <XMarkIcon className="size-8" />
      ) : (
        <MagnifyingGlassIcon className="size-8" />
      )}
    </button>
  );
}
