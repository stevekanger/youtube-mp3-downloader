"use client";

import PageLoading from "@/components/ui/PageLoading";
import NavigationContext from "../contexts/NavigationContext";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface Props {
  children: React.ReactNode;
}

export default function NavigationProvider({ children }: Props) {
  const router = useRouter();
  const [isPending, setTransition] = useTransition();

  function navigate(path: string) {
    setTransition(() => router.push(path));
  }

  if (isPending) {
    return <PageLoading />;
  }

  return (
    <NavigationContext.Provider value={{ isPending, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}
