interface Props {
  children: React.ReactNode;
}

export default function InputErrorMsg({ children }: Props) {
  if (!children) return null;

  return <p className="my-2 text-danger">{children}</p>;
}
