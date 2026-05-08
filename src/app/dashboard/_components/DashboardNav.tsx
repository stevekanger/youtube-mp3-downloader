import Section from "@/components/ui/Section";
import DashboardNavLink from "./DashboardNavLink";

export default function DashboardNav() {
  return (
    <Section>
      <nav className="flex flex-col sm:flex-row gap-1 border-b-2 border-background-secondary">
        <DashboardNavLink href="/dashboard">Dashboard</DashboardNavLink>
        <DashboardNavLink href="/dashboard/profile">Profile</DashboardNavLink>
        <DashboardNavLink href="/dashboard/ai">Ai Settings</DashboardNavLink>
      </nav>
    </Section>
  );
}
