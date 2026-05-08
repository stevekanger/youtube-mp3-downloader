"use client";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "sm" | "md" | "lg";
}

const variantStyles = {
  sm: "px-2 py-1 text-base",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

export default function Input({ variant = "sm", ...rest }: Props) {
  return (
    <div className="w-full my-2">
      <input
        className={`${variantStyles[variant]} w-full text-foreground-light bg-background-light focus:ring-4 focus:ring-primary focus:outline-none rounded-full`}
        {...rest}
      />
    </div>
  );
}
