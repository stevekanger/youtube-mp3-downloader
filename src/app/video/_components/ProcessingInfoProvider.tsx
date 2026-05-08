"use client";

import { useState } from "react";
import ProcessingInfoContext from "../_contexts/ProcessingInfoContext";

interface Props {
  children: React.ReactNode;
  videoId: string;
  videoTitle: string;
}

export default function ProcessingInfoProvider({
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
    <ProcessingInfoContext.Provider
      value={{ videoId, videoTitle, processingInfo, setProcessingInfo }}
    >
      {children}
    </ProcessingInfoContext.Provider>
  );
}
