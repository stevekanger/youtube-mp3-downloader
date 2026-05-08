"use client";

import { useEffect, useState } from "react";
import AiVendorContext from "../contexts/AiVendorContext";
import { AiVendor } from "../types";
import { useSession } from "next-auth/react";
import { useApi } from "@/features/api";
import { ApiDataAiVendors } from "@/features/api/types";

interface Props {
  children: React.ReactNode;
}

export default function AiVendorProvider({ children }: Props) {
  const { data: session } = useSession();
  const [activeVendor, setActiveVendor] = useState<AiVendor | null>(null);
  const [vendors, setVendors] = useState<AiVendor[]>([]);
  const [initialized, setInitialized] = useState(false);
  const { apiFetch, isPending } = useApi();

  async function initiaizeVendors() {
    if (!session?.user) {
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

  useEffect(() => {
    if (!vendors.length) {
      setActiveVendor(null);
      return;
    }

    setActiveVendor(vendors.find((vendor) => vendor.active) || null);
  }, [vendors]);

  return (
    <AiVendorContext.Provider
      value={{ initialized, isPending, vendors, setVendors, activeVendor }}
    >
      {children}
    </AiVendorContext.Provider>
  );
}
