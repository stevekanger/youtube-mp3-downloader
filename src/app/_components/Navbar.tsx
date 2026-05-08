"use client";

import { Disclosure } from "@headlessui/react";
import NavbarProfile from "./NavbarProfile";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="mx-auto w-full max-w-2xl bg-background-secondary rounded-full border border-background-secondary-border"
    >
      <div className="relative flex px-4 h-16 items-center justify-between">
        <div className="flex items-center justify-center">
          <Logo />
        </div>

        <div className="flex items-center justify-center">
          <NavbarProfile />
        </div>
      </div>
    </Disclosure>
  );
}
