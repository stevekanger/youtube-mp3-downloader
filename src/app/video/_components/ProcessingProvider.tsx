"use client";

import { useState } from "react";
import ProcessingContext from "../_contexts/ProcessingContext";

interface Props {
  children: React.ReactNode;
  videoId: string;
  videoTitle: string;
}

export default function ProcessingProvider({
  children,
  videoId,
  videoTitle,
}: Props) {
  const [processingInfo, setProcessingInfo] = useState({
    filename: videoTitle,
    title: "",
    artist: "",
    album: "",
    track: "",
    date: "",
    year: "",
    genre: "",
  });

  return (
    <ProcessingContext.Provider
      value={{ videoId, videoTitle, processingInfo, setProcessingInfo }}
    >
      {children}
    </ProcessingContext.Provider>
  );
}
