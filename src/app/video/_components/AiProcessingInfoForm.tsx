"use client";

import { useApi } from "@/features/api";
import { useFormData, useFormMessages } from "@/features/forms";
import { useSession } from "next-auth/react";
import useProcessingInfo from "../_hooks/useProcessingInfo";
import { ApiDataGenrateFileData } from "@/features/api/types";
import { useAiVendors } from "@/features/ai";
import InputGroup from "@/components/ui/InputGroup";
import Btn from "@/components/ui/Btn";
import ProcessingText from "@/components/ui/ProcessingText";
import InputLabel from "@/components/ui/InputLabel";
import InputErrorMsg from "@/components/ui/InputErrorMsg";
import AiVendorSelect from "./AiVendorSelect";
import AiModelSelect from "./AiModelSelect";

export default function AiProcessingInfoForm() {
  const { vendors, activeVendor } = useAiVendors();
  const { videoTitle, setProcessingInfo } = useProcessingInfo();
  const { apiFetch, isPending } = useApi();
  const { data: session } = useSession();
  const { formMessages, setFormMessages, clearFormMessages } =
    useFormMessages("");
  const { formData, handleChange } = useFormData({
    vendor: activeVendor?.name || "",
    model: activeVendor?.model || "",
  });

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    clearFormMessages();

    if (!session?.user || !formData.vendor) {
      return;
    }

    const { ok, msg, data } = await apiFetch<ApiDataGenrateFileData>(
      `/api/users/${session.user.id}/generate-file-data`,
      {
        method: "POST",
        body: {
          vendor: formData.vendor,
          model: formData.model,
          videoTitle,
        },
      },
    );

    if (!ok) {
      setFormMessages(msg);
      return;
    }

    clearFormMessages();
    setProcessingInfo(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <InputGroup>
          <InputLabel>Vendor:</InputLabel>
          <AiVendorSelect
            vendors={vendors}
            activeVendor={activeVendor}
            handleChange={handleChange}
          />
        </InputGroup>
        <InputGroup>
          <InputLabel>Model:</InputLabel>
          <AiModelSelect
            vendor={formData.vendor}
            defaultModel={activeVendor?.model || ""}
            handleChange={handleChange}
          />
        </InputGroup>
      </div>
      <div className="mt-2">
        <Btn width="full">
          <ProcessingText isPending={isPending}>
            Fill Data With AI
          </ProcessingText>
        </Btn>
        <div className="flex items-center">
          <InputErrorMsg>{formMessages}</InputErrorMsg>
        </div>
      </div>
    </form>
  );
}
