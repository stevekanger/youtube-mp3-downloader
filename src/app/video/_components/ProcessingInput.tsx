"use client";

interface Props {
  id: string;
  label: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DetailsInput({
  id,
  label,
  name,
  value,
  handleChange,
}: Props) {
  return (
    <div className="w-full">
      <label>{label}</label>
      <input
        className="w-full p-2 bg-gray-950 rounded-full my-2"
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
