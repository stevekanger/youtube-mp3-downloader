import { AiVendorMapped } from "../types";
import { createContext } from "react";

interface AiVendorContextType {
  initialized: boolean;
  isPending: boolean;
  vendors: AiVendorMapped[];
  setVendors: React.Dispatch<React.SetStateAction<AiVendorMapped[]>>;
}

const AiVendorContext = createContext<AiVendorContextType>({
  initialized: false,
  isPending: false,
  vendors: [],
  setVendors: () => { },
});

export default AiVendorContext;
