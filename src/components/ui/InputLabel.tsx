interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export default function InputLabel({ children, ...rest }: Props) {
  return (
    <label className="block mb-2" {...rest}>
      {children}
    </label>
  );
}
