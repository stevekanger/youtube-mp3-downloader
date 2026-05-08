"use client";

import { useEffect, useState } from "react";
import AiVendorContext from "../contexts/AiVendorContext";
import { AiVendorMapped } from "../types";
import { useSession } from "next-auth/react";
import { useApi } from "@/features/api";
import { ApiDataAiVendors } from "@/features/api/types";

interface Props {
  children: React.ReactNode;
}

export default function AiVendorProvider({ children }: Props) {
  const { data: session } = useSession();
  const [vendors, setVendors] = useState<AiVendorMapped[]>([]);
  const [initialized, setInitialized] = useState(false);
  const { apiFetch, isPending } = useApi();

  async function initiaizeVendors() {
    if (!session?.user) {
      setInitialized(true);
      return;
    }

    const { ok, data } = await apiFetch<ApiDataAiVendors>(
      `/api/users/${session.user.id}/ai-vendors`,
    );

    if (ok) {
      setVendors(data);
    } else {
      setVendors([]);
    }

    setInitialized(true);
  }

  useEffect(() => {
    initiaizeVendors();
  }, [session]);

  return (
    <AiVendorContext.Provider
      value={{ initialized, isPending, vendors, setVendors }}
    >
      {children}
    </AiVendorContext.Provider>
  );
}
