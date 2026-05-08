"use client";

import Btn from "@/components/ui/Btn";
import { useApi } from "@/features/api";
import useFormMessages from "@/features/forms/hooks/useFormMessages";
import { signOut, useSession } from "next-auth/react";
import { ApiDataAiVendors } from "@/features/api/types";
import ProcessingText from "@/components/ui/ProcessingText";
import InputErrorMsg from "@/components/ui/InputErrorMsg";

export default function ProfileDelete() {
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

    const { ok, msg } = await apiFetch<ApiDataAiVendors>(
      `/api/users/${session.user.id}/profile`,
      {
        method: "DELETE",
        body: {
          id: session.user.id,
        },
      },
    );

    if (!ok) {
      setFormMessages(msg);
      return;
    }

    clearFormMessages();
    signOut({ callbackUrl: "/" });
  }

  return (
    <div className="mt-4 p-4 bg-background rounded-xl">
      <p>
        Are you sure you want to delete your account? This cannot be undone.
      </p>

      <div className="mt-4">
        <Btn onClick={handleClick} variant="danger">
          <ProcessingText isPending={isPending}>Delete</ProcessingText>
        </Btn>
        <InputErrorMsg>{formMessages}</InputErrorMsg>
      </div>
    </div>
  );
}
