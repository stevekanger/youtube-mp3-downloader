"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  href: string;
}

export default function DashboardNavLink({ children, href }: Props) {
  const pathname = usePathname();

  return (
    <Link
      className={
        pathname === href
          ? "inline-block text-center px-4 py-2 flex flex-1 bg-background-secondary-hover hover:bg-background-secondary-hover rounded-xl"
          : "inline-block text-center px-4 py-2 flex flex-1 bg-background-secondary hover:bg-background-secondary-hover rounded-xl"
      }
      href={href}
    >
      {children}
    </Link>
  );
}
