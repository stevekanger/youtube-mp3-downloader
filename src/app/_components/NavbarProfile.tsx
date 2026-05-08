"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import SignInBtn from "./SignInBtn";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { usePathname } from "next/navigation";

const menuItemStyles = {
  active: "text-left w-full block px-4 py-2 bg-background-secondary-hover",
  default:
    "text-left w-full block px-4 py-2 hover:bg-background-secondary-hover",
};

export default function NavbarProfile() {
  const { status, data: session } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <p className="relative flex items-center justify-center bg-background border border-background-secondary-border w-10 h-10 rounded-full">
        <LoadingSpinner size={16} />
      </p>
    );
  }

  if (!session) {
    return <SignInBtn />;
  }

  return (
    <Menu as="div" className="relative ml-3">
      <MenuButton className="relative flex items-center justify-center bg-background hover:bg-background-hover border border-background-secondary-border w-10 h-10 rounded-full focus-visible:outline-none">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <span>{session?.user?.name?.[0].toUpperCase() || "U"}</span>
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-background-secondary py-1 border border-background-secondary-border transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in focus:outline-none"
      >
        <MenuItem>
          <Link
            href="/dashboard"
            className={
              pathname === "/dashboard"
                ? menuItemStyles.active
                : menuItemStyles.default
            }
          >
            Dashboard
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href="/dashboard/profile"
            className={
              pathname === "/dashboard/profile"
                ? menuItemStyles.active
                : menuItemStyles.default
            }
          >
            Your profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href="/dashboard/settings"
            className={
              pathname === "/dashboard/settings"
                ? menuItemStyles.active
                : menuItemStyles.default
            }
          >
            Settings
          </Link>
        </MenuItem>
        <MenuItem>
          <button onClick={() => signOut()} className={menuItemStyles.default}>
            Sign out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
