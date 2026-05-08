import PageHeading from "@/components/ui/PageHeading";
import Section from "@/components/ui/Section";
import AddAiVendorForm from "./_components/AddAiVendorForm";
import AiVendors from "./_components/AiVendors";

export default async function DashboardSettingsPage() {
  return (
    <>
      <Section>
        <PageHeading>Ai Settings</PageHeading>
      </Section>
      <Section>
        <AiVendors />
      </Section>
      <Section>
        <AddAiVendorForm />
      </Section>
    </>
  );
}
