interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  rounded?: "base" | "lg" | "xl" | "full";
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "bgSecondary" | "success" | "danger";
  width?: "normal" | "full";
}

const roundedStyles = {
  base: "rounded",
  lg: "rounded-lg",
  xl: "rouded-xl",
  full: "rounded-full",
};

const sizeStyles = {
  sm: "text-md px-4 py-2",
  md: "text-md px-8 py-4",
  lg: "text-lg px-10 py-6",
  xl: "text-xl px-12 py-8",
};

const variantStyles = {
  primary: "bg-primary hover:bg-primary-hover",
  secondary: "bg-secondary hover:bg-secondary-hover",
  bgSecondary: "bg-background-secondary hover:bg-background-secondary-border",
  danger: "bg-danger hover:bg-danger-hover",
  success: "bg-success hover:bg-success-hover",
};

const widthStyles = {
  normal: "",
  full: "w-full",
};

export default function Btn({
  children,
  rounded = "full",
  size = "sm",
  variant = "primary",
  width = "normal",
  ...rest
}: Props) {
  return (
    <button
      className={`inline-block ${widthStyles[width]} ${variantStyles[variant]} ${sizeStyles[size]} ${roundedStyles[rounded]}`}
      {...rest}
    >
      {children}
    </button>
  );
}
