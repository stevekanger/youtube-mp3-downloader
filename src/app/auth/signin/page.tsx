import PageHeadingCentered from "@/components/ui/PageHeadingCentered";
import Section from "@/components/ui/Section";
import SectionSecondary from "@/components/ui/SectionSecondary";
import AuthBtn from "./_components/AuthBtn";

export default function PageSignIn() {
  return (
    <>
      <Section>
        <PageHeadingCentered>Sign In / Sign Up</PageHeadingCentered>
      </Section>

      <SectionSecondary>
        <div className="text-center">
          <AuthBtn provider="google" />
        </div>
      </SectionSecondary>
    </>
  );
}
