interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  variant: "sm" | "md" | "lg";
}

const variantStyles = {
  sm: "px-2 py-1 text-base",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

export default function Select({ variant, children, ...rest }: Props) {
  return (
    <select
      className={`${variantStyles[variant]} w-full appearance-none text-foreground-light bg-background-light focus:ring-4 focus:ring-primary focus:outline-none rounded-full`}
      {...rest}
    >
      {children}
    </select>
  );
}
