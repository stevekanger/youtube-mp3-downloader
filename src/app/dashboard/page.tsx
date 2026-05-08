import Section from "@/components/ui/Section";
import DashboardGreeting from "./_components/DashboardGreeting";

export default function DashboardPage() {
  return (
    <Section>
      <DashboardGreeting />
      <p className="my-4">
        Here you can change your settings, edit your profile and other account
        related things.
      </p>
    </Section>
  );
}
