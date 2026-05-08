"use client";

import Btn from "@/components/ui/Btn";
import Input from "@/components/ui/Input";
import InputErrorMsg from "@/components/ui/InputErrorMsg";
import InputGroup from "@/components/ui/InputGroup";
import InputLabel from "@/components/ui/InputLabel";
import ProcessingText from "@/components/ui/ProcessingText";
import { useApi } from "@/features/api";
import { useFormData, useFormMessages } from "@/features/forms";
import { useSession } from "next-auth/react";

export default function ProfileEditForm() {
  const { update: sessionUpdate, data: session } = useSession();
  const { formMessages, setFormMessages, clearFormMessages } =
    useFormMessages("");
  const { formData, handleChange } = useFormData({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  });
  const { apiFetch, isPending } = useApi();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    clearFormMessages();

    if (!session?.user) {
      setFormMessages("No user for this session.");
      return;
    }

    const { ok, msg } = await apiFetch(
      `/api/users/${session.user.id}/profile`,
      {
        method: "PATCH",
        body: {
          name: formData.name,
          email: formData.email,
        },
      },
    );

    if (!ok) {
      setFormMessages(msg);
      return;
    }

    await sessionUpdate();
    clearFormMessages();
  }

  return (
    <form className="p-4 bg-background rounded-xl" onSubmit={handleSubmit}>
      <InputGroup>
        <InputLabel>Username: </InputLabel>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <InputLabel>Email: </InputLabel>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </InputGroup>

      <div className="my-4">
        <Btn type="submit">
          <ProcessingText isPending={isPending}>Submit</ProcessingText>
        </Btn>
        <InputErrorMsg>{formMessages}</InputErrorMsg>
      </div>
    </form>
  );
}
