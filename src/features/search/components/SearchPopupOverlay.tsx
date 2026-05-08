import useSearchPopup from "../hooks/useSearchPopup";

export default function SearchFormOverlay() {
  const { toggleOpen } = useSearchPopup();

  return (
    <div
      onClick={toggleOpen}
      className="absolute top-0 left-0 w-full h-full bg-gray-950/80"
    ></div>
  );
}
