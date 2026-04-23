import { Disclosure } from "@headlessui/react";
import Profile from "./NavbarProfile";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="mx-auto w-full max-w-2xl bg-gray-900 rounded-full border border-gray-700"
    >
      <div className="relative flex px-4 h-16 items-center justify-between">
        <div className="flex items-center justify-center">
          <Logo />
        </div>

        <div className="flex items-center justify-center">
          <Profile />
        </div>
      </div>
    </Disclosure>
  );
}
