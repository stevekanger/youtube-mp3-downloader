"use client";

import Btn from "@/components/ui/Btn";
import Input from "@/components/ui/Input";
import InputGroup from "@/components/ui/InputGroup";
import InputLabel from "@/components/ui/InputLabel";
import Option from "@/components/ui/Option";
import Select from "@/components/ui/Select";
import { useApi } from "@/features/api";
import { ApiDataAiVendors } from "@/features/api/types";
import { useFormData, useFormMessages } from "@/features/forms";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAiVendors } from "@/features/ai";
import ProcessingText from "@/components/ui/ProcessingText";
import InputErrorMsg from "@/components/ui/InputErrorMsg";

export default function AddAiVendorForm() {
  const { data: session } = useSession();
  const { setVendors } = useAiVendors();
  const [isOpen, setIsOpen] = useState(false);
  const { apiFetch, isPending } = useApi();
  const { formMessages, setFormMessages, clearFormMessages } =
    useFormMessages("");
  const { formData, clearFormData, handleChange } = useFormData({
    name: "",
    key: "",
  });

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    clearFormMessages();

    if (!session?.user.id) {
      setFormMessages("No current user for this sesison.");
      return;
    }

    const { ok, msg, data } = await apiFetch<ApiDataAiVendors>(
      `/api/users/${session.user.id}/ai-vendors`,
      {
        method: "POST",
        body: {
          name: formData.name,
          key: formData.key,
        },
      },
    );

    if (!ok) {
      setFormMessages(msg);
      return;
    }

    clearFormData();
    clearFormMessages();
    setVendors(data);
    setIsOpen(false);
  }

  if (!isOpen) {
    return (
      <Btn
        variant="primary"
        size="sm"
        type="button"
        rounded="full"
        onClick={() => setIsOpen(!isOpen)}
      >
        Add Vendor
      </Btn>
    );
  }

  return (
    <>
      <form
        className="w-full p-4 flex flex-col bg-background-secondary rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex">
          <button className="ml-auto" onClick={() => setIsOpen(false)}>
            <XMarkIcon className="size-4" />
          </button>
        </div>

        <InputGroup>
          <InputLabel htmlFor="providerName">Vendor Name</InputLabel>
          <Select
            onChange={handleChange}
            name="name"
            id="name"
            variant="md"
            value={formData.name}
          >
            <Option value="">-- Please select a vendor --</Option>
            <Option value="google">Google</Option>
          </Select>
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="key">Vendor Key</InputLabel>
          <Input
            id="key"
            name="key"
            value={formData.key}
            variant="md"
            onChange={handleChange}
            autoComplete="off"
          />
        </InputGroup>

        <div className="mt-4">
          <Btn type="submit">
            <ProcessingText isPending={isPending}>Submit</ProcessingText>
          </Btn>
          <InputErrorMsg>{formMessages}</InputErrorMsg>
        </div>
      </form>
    </>
  );
}
