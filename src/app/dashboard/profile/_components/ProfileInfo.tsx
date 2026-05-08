"use client";

import { useSession } from "next-auth/react";

export default function ProfileInfo() {
  const { data: session } = useSession();

  return (
    <div className="p-4 bg-background-secondary rounded-xl">
      <p>Username: {session?.user.name || ""}</p>
      <p>Email: {session?.user.email || ""}</p>
    </div>
  );
}
