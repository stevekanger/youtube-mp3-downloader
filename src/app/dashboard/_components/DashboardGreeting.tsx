"use client";

import { useSession } from "next-auth/react";
import PageHeading from "@/components/ui/PageHeading";

export default function DashboardGreeting() {
  const { data: session } = useSession();

  return <PageHeading>Hello {session?.user?.name}</PageHeading>;
}
