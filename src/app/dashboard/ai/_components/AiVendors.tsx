"use client";

import { useAiVendors } from "@/features/ai";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AiVendorItem from "./AiVendorItem";

export default function AiVendors() {
  const { isPending, initialized, vendors } = useAiVendors();

  if (isPending || !initialized) {
    return (
      <div>
        <LoadingSpinner size={16} />
        Fetching Data...
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Ai Vendors</h2>
      {vendors.length ? (
        vendors.map((vendor) => (
          <AiVendorItem
            key={vendor.id}
            id={vendor.id}
            name={vendor.name}
            apiKey={vendor.key}
          />
        ))
      ) : (
        <p>No Ai vendors registered.</p>
      )}
    </div>
  );
}
