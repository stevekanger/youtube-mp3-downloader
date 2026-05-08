interface Props {
  size?: number;
}

export default function LoadingSpinner({ size = 16 }: Props) {
  return (
    <span
      style={{ width: size, height: size }}
      className="inline-block border-4 border-gray-200 border-t-gray-50/30 mx-1 rounded-full animate-spin"
    />
  );
}
