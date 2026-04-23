"use server";

export async function handleSubmit(prevState: any, formData: FormData) {
  const name = formData.get("name");
  // process...

  return { message: "Success!", data: "" };
}
