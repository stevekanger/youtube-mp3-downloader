interface Props {
  children: React.ReactNode;
}

export default function PageContainer({ children }: Props) {
  return <div className="container mx-auto">{children}</div>;
}
