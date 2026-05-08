interface Props {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: Props) {
  return <div className="flex flex-col gap-8 flex-1 py-12">{children}</div>;
}
