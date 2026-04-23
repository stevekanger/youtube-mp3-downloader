interface Props {
  id: string;
  label: string;
  name: string;
}

export default function DetailsInput({ id, label, name }: Props) {
  return (
    <div className="w-full">
      <label>{label}</label>
      <input
        className="w-full p-2 bg-gray-950 rounded-full my-2"
        type="text"
        id={id}
        name={name}
      />
    </div>
  );
}
