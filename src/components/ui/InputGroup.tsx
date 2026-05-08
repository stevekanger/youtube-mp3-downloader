interface Props {
  children: React.ReactNode;
}

export default function InputGroup({ children }: Props) {
  return <div className="w-full my-4">{children}</div>;
}
