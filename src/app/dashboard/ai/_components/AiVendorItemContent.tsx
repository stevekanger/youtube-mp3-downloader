interface Props {
  name: string;
  apiKey: string;
}

export default function AiVendorItemContent({ name, apiKey }: Props) {
  return (
    <div className="p-4">
      <p>Name: {name}</p>
      <p>Key: {apiKey}</p>
    </div>
  );
}
