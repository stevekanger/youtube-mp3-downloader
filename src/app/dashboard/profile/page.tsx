import PageHeading from "@/components/ui/PageHeading";
import Section from "@/components/ui/Section";
import Profile from "./_components/Profile";

export default function DashboardProfilePage() {
  return (
    <>
      <Section>
        <PageHeading>Profile</PageHeading>
      </Section>
      <Section>
        <Profile />
      </Section>
    </>
  );
}
