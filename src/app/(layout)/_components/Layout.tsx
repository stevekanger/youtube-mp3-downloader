import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchPopup from "./SearchPopup";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <SearchPopup />
      <Footer />
    </>
  );
}
