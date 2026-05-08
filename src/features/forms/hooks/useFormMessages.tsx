import { useState } from "react";

export default function useFormMessages<TData>(data: TData) {
  const [formMessages, setFormMessages] = useState(data);

  function clearFormMessages() {
    setFormMessages(data);
  }

  return {
    formMessages,
    clearFormMessages,
    setFormMessages,
  };
}
