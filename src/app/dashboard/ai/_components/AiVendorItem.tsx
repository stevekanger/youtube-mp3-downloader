"use client";

import { useState } from "react";
import AiVendorItemEdit from "./AiVendorItemEdit";
import AiVendorItemContent from "./AiVendorItemContent";
import AiVendorItemToggleBtns from "./AiVendorItemToggleBtns";
import AiVendorItemDelete from "./AiVendorItemDelete";

interface Props {
  id: string;
  name: string;
  apiKey: string;
}

export default function AiVendorItem({ id, name, apiKey }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="p-4 mb-2 bg-background-secondary rounded-xl" key={id}>
      <div className="flex flex-col items-center sm:flex-row">
        <AiVendorItemContent name={name} apiKey={apiKey} />
        <AiVendorItemToggleBtns
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
        />
      </div>

      {isEditOpen && <AiVendorItemEdit id={id} />}
      {isDeleteOpen && <AiVendorItemDelete id={id} />}
    </div>
  );
}
