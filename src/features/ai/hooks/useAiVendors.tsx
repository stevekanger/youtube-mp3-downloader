import { useContext } from "react";
import AiVendorContext from "../contexts/AiVendorContext";

export default function useAiVendors() {
  const { initialized, isPending, vendors, setVendors, activeVendor } =
    useContext(AiVendorContext);

  return {
    initialized,
    isPending,
    vendors,
    setVendors,
    activeVendor,
  };
}
