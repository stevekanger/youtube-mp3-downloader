import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function NavbarProfile() {
  return (
    <Menu as="div" className="relative ml-3">
      <MenuButton className="relative flex items-center justify-center bg-gray-800 border border-gray-700 w-10 h-10 rounded-full hover:bg-gray-600 focus-visible:outline-none">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <span>S</span>
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 border border-gray-700 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <MenuItem>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
          >
            Your profile
          </a>
        </MenuItem>
        <MenuItem>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
          >
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
          >
            Sign out
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
