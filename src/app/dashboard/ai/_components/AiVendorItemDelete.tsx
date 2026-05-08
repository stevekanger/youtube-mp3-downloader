"use client";

import Btn from "@/components/ui/Btn";
import { useApi } from "@/features/api";
import useFormMessages from "@/features/forms/hooks/useFormMessages";
import { useSession } from "next-auth/react";
import { useAiVendors } from "@/features/ai";
import { ApiDataAiVendors } from "@/features/api/types";
import ProcessingText from "@/components/ui/ProcessingText";
import InputErrorMsg from "@/components/ui/InputErrorMsg";

interface Props {
  id: string;
}

export default function AiVendorItemDelete({ id }: Props) {
  const { setVendors } = useAiVendors();
  const { apiFetch, isPending } = useApi();
  const { data: session } = useSession();
  const { formMessages, setFormMessages, clearFormMessages } =
    useFormMessages("");

  async function handleClick() {
    clearFormMessages();

    if (!session?.user) {
      setFormMessages("No user found in this session.");
      return;
    }

    const { ok, msg, data } = await apiFetch<ApiDataAiVendors>(
      `/api/users/${session.user.id}/ai-vendors`,
      {
        method: "DELETE",
        body: {
          id,
        },
      },
    );

    if (!ok) {
      setFormMessages(msg);
      return;
    }

    setVendors(data);
    clearFormMessages();
  }

  return (
    <div className="mt-4 p-4 bg-background rounded-xl">
      <p>Are you sure you want to delete this Vendor? This cannot be undone.</p>

      <div className="mt-4">
        <Btn onClick={handleClick} variant="danger">
          <ProcessingText isPending={isPending}>Delete</ProcessingText>
        </Btn>
        <InputErrorMsg>{formMessages}</InputErrorMsg>
      </div>
    </div>
  );
}
