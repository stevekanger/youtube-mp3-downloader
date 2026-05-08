"use client";

import Option from "@/components/ui/Option";
import Select from "@/components/ui/Select";
import { AiVendor } from "@/features/ai/types";
import { FormChangeFunction } from "@/features/forms/types";

interface Props {
  vendors: AiVendor[];
  activeVendor: AiVendor | null;
  handleChange: FormChangeFunction;
}

export default function AiVendorSelect({
  activeVendor,
  vendors,
  handleChange,
}: Props) {
  if (!vendors.length) {
    return (
      <Select variant="sm">
        <Option value="">-- No vendors to display --</Option>
      </Select>
    );
  }

  return (
    <Select
      name="vendor"
      onChange={handleChange}
      defaultValue={activeVendor?.name || ""}
      variant="sm"
    >
      <Option value="">-- Select a vendor --</Option>
      {vendors.map((vendor) => (
        <Option key={vendor.name} value={vendor.name}>
          {vendor.name}
        </Option>
      ))}
    </Select>
  );
}
