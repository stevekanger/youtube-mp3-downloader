interface Props extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

export default function Option({ children, ...rest }: Props) {
  return <option {...rest}>{children}</option>;
}
