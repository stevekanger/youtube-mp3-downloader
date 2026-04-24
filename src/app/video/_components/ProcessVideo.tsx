"use client";

import { useState } from "react";
import useProcessing from "../_hooks/useProcessing";

export default function ProcessVideo() {
  const { videoId, processingInfo } = useProcessing();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: videoId,
          filename: processingInfo.filename,
          title: processingInfo.title,
          artist: processingInfo.artist,
          album: processingInfo.album,
          track: processingInfo.track,
          date: processingInfo.date,
          year: processingInfo.year,
          genre: processingInfo.genre,
        }),
      });

      if (!res.ok) {
        throw new Error("There was an error processing your request.");
      }

      const { success, msg, data } = await res.json();

      if (!success) {
        throw new Error(data.msg);
      }

      const blob = new Blob([Buffer.from(data, "base64")], {
        type: "audio/mpeg",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${processingInfo.filename || "File"}.mp3`;
      a.click();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      className="text-3xl w-full py-8 px-4 mb-8 bg-indigo-800 hover:bg-indigo-700 rounded-lg"
    >
      {loading ? "Processing..." : "Convert And Download"}
    </button>
  );
}
