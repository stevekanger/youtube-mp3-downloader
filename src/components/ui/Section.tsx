import Container from "./Container";

interface Props {
  children: React.ReactNode;
}

export default function Section({ children }: Props) {
  return (
    <Container>
      <section>{children}</section>
    </Container>
  );
}
