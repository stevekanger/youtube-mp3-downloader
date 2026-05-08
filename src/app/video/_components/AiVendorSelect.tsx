"use client";

import Option from "@/components/ui/Option";
import Select from "@/components/ui/Select";
import { AiVendorMapped } from "@/features/ai/types";
import { FormChangeFunction } from "@/features/forms/types";

interface Props {
  vendors: AiVendorMapped[];
  handleChange: FormChangeFunction;
}

export default function AiVendorSelect({ vendors, handleChange }: Props) {
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
      defaultValue={vendors[0]?.name || ""}
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
