"use client";

import { signIn } from "next-auth/react";
import capitalize from "@/utils/capitalize";

interface Props {
  provider: "google";
}

export default function AuthBtn({ provider }: Props) {
  return (
    <button
      className="w-full py-2 px-4 text-zinc-900 bg-gray-300 hover:bg-gray-200 rounded-full"
      onClick={() => signIn(provider, { callbackUrl: "/dashboard" })}
    >
      Authenticate with {capitalize(provider)}
    </button>
  );
}
