import Container from "./Container";

interface Props {
  children: React.ReactNode;
}

export default function SectionSecondary({ children }: Props) {
  return (
    <Container>
      <section className="p-4 bg-background-secondary rounded-xl">
        {children}
      </section>
    </Container>
  );
}
