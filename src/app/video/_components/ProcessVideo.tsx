"use client";

import { useApi } from "@/features/api";
import useProcessingInfo from "../_hooks/useProcessingInfo";
import { ApiDataProcessVideo } from "@/features/api/types";
import Btn from "@/components/ui/Btn";
import ProcessingText from "@/components/ui/ProcessingText";
import useFormMessages from "@/features/forms/hooks/useFormMessages";
import InputErrorMsg from "@/components/ui/InputErrorMsg";

export default function ProcessVideo() {
  const { videoId, processingInfo } = useProcessingInfo();
  const { apiFetch, isPending } = useApi();
  const { formMessages, setFormMessages } = useFormMessages("");

  async function handleClick() {
    setFormMessages("");
    const { ok, msg, data } = await apiFetch<ApiDataProcessVideo>(
      "/api/process-video",
      {
        method: "POST",
        body: {
          id: videoId,
          filename: processingInfo.filename,
          title: processingInfo.title,
          artist: processingInfo.artist,
          album: processingInfo.album,
          track: processingInfo.track,
          date: processingInfo.date,
          year: processingInfo.year,
          genre: processingInfo.genre,
        },
      },
    );

    if (!ok) {
      setFormMessages(msg);
      return;
    }

    const blob = new Blob([Buffer.from(data, "base64")], {
      type: "audio/mpeg",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${processingInfo.filename || "File"}.mp3`;
    a.click();
  }

  return (
    <div>
      <Btn size="xl" width="full" onClick={handleClick}>
        <ProcessingText isPending={isPending}>
          Convert And Dowload
        </ProcessingText>
      </Btn>
      <InputErrorMsg>{formMessages}</InputErrorMsg>
    </div>
  );
}
