"use client";

import { useState } from "react";
import useProcessing from "../_hooks/useProcessing";
import ProcessingInput from "./ProcessingInput";

export default function ProcessingInfoForm() {
  const { videoTitle, processingInfo, setProcessingInfo } = useProcessing();
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProcessingInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/generate-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoTitle,
        }),
      });

      if (!res.ok) {
        throw new Error("There was an error processing your request.");
      }

      const { success, msg, data } = await res.json();

      if (!success) {
        throw new Error(msg);
      }

      setProcessingInfo(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 my-8 bg-gray-900 rounded-lg">
      <h3 className="text-2xl mb-4">Processing Info</h3>

      <ProcessingInput
        id="filename"
        name="filename"
        label="Filename"
        value={processingInfo.filename}
        handleChange={handleChange}
      />

      <h3 className="text-2xl my-4">Metadata</h3>

      <ProcessingInput
        id="title"
        name="title"
        label="Title"
        value={processingInfo.title}
        handleChange={handleChange}
      />
      <ProcessingInput
        id="artist"
        name="artist"
        label="Artist"
        value={processingInfo.artist}
        handleChange={handleChange}
      />
      <ProcessingInput
        id="album"
        name="album"
        label="Album"
        value={processingInfo.album}
        handleChange={handleChange}
      />
      <ProcessingInput
        id="track"
        name="track"
        label="Track"
        value={processingInfo.track}
        handleChange={handleChange}
      />
      <ProcessingInput
        id="date"
        name="date"
        label="Date"
        value={processingInfo.date}
        handleChange={handleChange}
      />
      <ProcessingInput
        id="year"
        name="year"
        label="Year"
        value={processingInfo.year}
        handleChange={handleChange}
      />
      <ProcessingInput
        id="genre"
        name="genre"
        label="Genre"
        value={processingInfo.genre}
        handleChange={handleChange}
      />

      <button
        type="submit"
        className="w-full p-2 my-2 bg-indigo-800 hover:bg-indigo-700 rounded-full"
      >
        {loading ? "Processing..." : "Generate Data With Ai"}
      </button>
    </form>
  );
}
