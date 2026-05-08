import { AiVendor } from "../types";
import { createContext } from "react";

interface AiVendorContextType {
  initialized: boolean;
  isPending: boolean;
  vendors: AiVendor[];
  setVendors: React.Dispatch<React.SetStateAction<AiVendor[]>>;
  activeVendor: AiVendor | null;
}

const AiVendorContext = createContext<AiVendorContextType>({
  initialized: false,
  isPending: false,
  vendors: [],
  setVendors: () => { },
  activeVendor: null,
});

export default AiVendorContext;
