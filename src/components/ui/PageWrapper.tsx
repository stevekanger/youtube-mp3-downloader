import Container from "./Container";

interface Props {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: Props) {
  return (
    <div className="flex-1 py-8">
      <Container>{children}</Container>
    </div>
  );
}
