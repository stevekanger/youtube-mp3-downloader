import { useState } from "react";
import { FormChangeEvent } from "../types";

export default function useFormData<TData>(data: TData) {
  const [formData, setFormData] = useState(data);

  function clearFormData() {
    setFormData(data);
  }

  function handleChange(e: FormChangeEvent) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return {
    formData,
    setFormData,
    clearFormData,
    handleChange,
  };
}
