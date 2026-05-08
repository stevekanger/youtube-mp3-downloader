"use client";

import { useApi } from "@/features/api";
import { useFormMessages } from "@/features/forms";
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
import { useState } from "react";
import { FormChangeEvent } from "@/features/forms/types";

export default function AiProcessingInfoForm() {
  const { vendors } = useAiVendors();
  const { videoTitle, setProcessingInfo } = useProcessingInfo();
  const { apiFetch, isPending } = useApi();
  const { data: session } = useSession();
  const { formMessages, setFormMessages, clearFormMessages } =
    useFormMessages("");
  const [formData, setFormData] = useState({
    vendor: vendors[0]?.name || "",
    model: vendors[0]?.lastUsedModel || "",
  });

  function handleChange(e: FormChangeEvent) {
    setFormData((prev) => {
      if (e.target.name === "vendor" && !e.target.value) {
        return {
          vendor: "",
          model: "",
        };
      }

      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    clearFormMessages();

    if (!session?.user) {
      return;
    }

    if (!formData.model || !formData.vendor) {
      setFormMessages("Vendor and model are required.");
      return;
    }

    const { ok, msg, data } = await apiFetch<ApiDataGenrateFileData>(
      `/api/users/${session.user.id}/generate-file-data`,
      {
        method: "POST",
        body: {
          videoTitle,
          vendor: formData.vendor,
          model: formData.model,
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
          <AiVendorSelect vendors={vendors} handleChange={handleChange} />
        </InputGroup>
        <InputGroup>
          <InputLabel>Model:</InputLabel>
          <AiModelSelect
            vendor={formData.vendor}
            defaultModel={formData.model}
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
