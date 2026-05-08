interface Props {
  children: React.ReactNode;
}

export default function PageHeadingCentered({ children }: Props) {
  return <h1 className="text-3xl text-center">{children}</h1>;
}
