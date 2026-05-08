import { createContext } from "react";

interface NavigationContextType {
  isPending: boolean;
  navigate: (href: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  isPending: false,
  navigate: () => { },
});

export default NavigationContext;
