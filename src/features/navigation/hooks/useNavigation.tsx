import { useContext } from "react";
import NavigationContext from "../contexts/NavigationContext";

export default function useNavigation() {
  const { isPending, navigate } = useContext(NavigationContext);

  return { isPending, navigate };
}
