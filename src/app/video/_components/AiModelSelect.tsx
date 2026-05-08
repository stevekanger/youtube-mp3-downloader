"use client";

import Option from "@/components/ui/Option";
import Select from "@/components/ui/Select";
import { getVendorModels } from "@/features/ai/services/vendors";
import { FormChangeFunction } from "@/features/forms/types";

interface Props {
  vendor: string;
  defaultModel: string;
  handleChange: FormChangeFunction;
}

export default function AiModelSelect({
  vendor,
  defaultModel,
  handleChange,
}: Props) {
  const models = getVendorModels(vendor);

  if (!models) {
    return (
      <Select variant="sm">
        <Option value="">-- Select a model --</Option>
      </Select>
    );
  }

  return (
    <Select
      name="model"
      variant="sm"
      defaultValue={defaultModel}
      onChange={handleChange}
    >
      <Option value="">-- Select a model --</Option>
      {models.all.map((model) => (
        <Option key={model} value={model}>
          {model}
        </Option>
      ))}
    </Select>
  );
}
