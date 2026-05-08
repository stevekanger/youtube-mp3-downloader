"use client";

import AiProcessingBanner from "./AiProcessingBanner";
import { useAiVendors } from "@/features/ai";
import AiProcessingInfoForm from "./AiProcessingInfoForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AiProcessingInfo() {
  const { vendors, initialized } = useAiVendors();

  if (!initialized)
    return (
      <div className="flex items-center">
        <LoadingSpinner />
      </div>
    );

  return vendors.length ? <AiProcessingInfoForm /> : <AiProcessingBanner />;
}
