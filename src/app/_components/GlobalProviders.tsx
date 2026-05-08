"use client";

import { SessionProvider } from "next-auth/react";
import { NavigationProvider } from "@/features/navigation";
import { AiVendorProvider } from "@/features/ai";

interface Props {
  children: React.ReactNode;
}

export default function GlobalProviders({ children }: Props) {
  return (
    <SessionProvider>
      <NavigationProvider>
        <AiVendorProvider>{children}</AiVendorProvider>
      </NavigationProvider>
    </SessionProvider>
  );
}
