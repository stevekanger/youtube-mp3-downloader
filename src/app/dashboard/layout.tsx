import { getServerSession } from "next-auth/next";
import { nextAuthConfig } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardNav from "./_components/DashboardNav";

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const session = await getServerSession(nextAuthConfig);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <>
      <DashboardNav />
      {children}
    </>
  );
}
