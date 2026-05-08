"use client";

import Btn from "@/components/ui/Btn";
import Input from "@/components/ui/Input";
import InputGroup from "@/components/ui/InputGroup";
import InputLabel from "@/components/ui/InputLabel";
import ProcessingText from "@/components/ui/ProcessingText";
import { useApi } from "@/features/api";
import { ApiDataAiVendors } from "@/features/api/types";
import { useFormData, useFormMessages } from "@/features/forms";
import { useAiVendors } from "@/features/ai";
import InputErrorMsg from "@/components/ui/InputErrorMsg";
import { useSession } from "next-auth/react";

interface Props {
  id: string;
}

export default function AiVendorItemEdit({ id }: Props) {
  const { data: session } = useSession();
  const { apiFetch, isPending } = useApi();
  const { setVendors } = useAiVendors();
  const { formMessages, setFormMessages } = useFormMessages("");
  const { formData, handleChange } = useFormData({
    key: "",
  });

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormMessages("");

    if (!session?.user) {
      setFormMessages("No user on this session.");
      return;
    }

    const { ok, msg, data } = await apiFetch<ApiDataAiVendors>(
      `/api/users/${session.user.id}/settings/ai-vendors`,
      {
        method: "PATCH",
        body: {
          id,
          data: {
            key: formData.key,
          },
        },
      },
    );

    if (!ok) {
      setFormMessages(msg);
      return;
    }

    setVendors(data);
  }

  return (
    <form className="mt-4 p-4 bg-background rounded-xl" onSubmit={handleSubmit}>
      <InputGroup>
        <InputLabel>New Key:</InputLabel>
        <Input
          variant="md"
          name="key"
          id="key"
          value={formData.key}
          onChange={handleChange}
        />
      </InputGroup>

      <div className="mt-4">
        <Btn type="submit">
          <ProcessingText isPending={isPending}>Submit</ProcessingText>
        </Btn>
        <InputErrorMsg>{formMessages}</InputErrorMsg>
      </div>
    </form>
  );
}
