"use client";

import { useActionState } from "react";
import ProcessingInput from "./ProcessingInput";
import { handleSubmit } from "../_actions/processVideo";

interface Props {
  id: string;
  title: string;
}

export default function ProcessingForm({ id, title }: Props) {
  const [state, formAction, pending] = useActionState(handleSubmit, null);

  console.log(state);

  return (
    <form action={formAction}>
      <div className="p-4 my-4 bg-gray-900 rounded-lg">
        <h3 className="text-2xl ">Track Details</h3>
      </div>
      <div className="my-4 p-4 bg-gray-900 rounded-lg">
        <input type="hidden" value="some value" />
        <ProcessingInput id="filename" name="filename" label="Filename" />
        <ProcessingInput id="title" name="title" label="Title" />
        <ProcessingInput id="artist" name="artist" label="Artist" />
        <ProcessingInput id="album" name="album" label="Album" />
        <ProcessingInput id="track" name="track" label="Track" />
        <ProcessingInput id="date" name="date" label="Date" />
        <ProcessingInput id="year" name="year" label="Year" />
        <ProcessingInput id="genre" name="genre" label="Genre" />
      </div>

      <button
        type="submit"
        className="w-full p-8 text-3xl bg-gray-900 hover:bg-gray-700 rounded-lg"
      >
        Convert And Download
      </button>
    </form>
  );
}
