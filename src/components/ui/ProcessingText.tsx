import LoadingSpinner from "./LoadingSpinner";

interface Props {
  children: React.ReactNode;
  isPending: boolean;
}

export default function ProcessingText({ children, isPending }: Props) {
  return isPending ? (
    <span>
      <LoadingSpinner size={16} />
      Processing...
    </span>
  ) : (
    children
  );
}
