interface Props {
  children: React.ReactNode;
}

export default function PageWrapperDashboard({ children }: Props) {
  return <div className="flex gap-8 flex-1 py-12">{children}</div>;
}
