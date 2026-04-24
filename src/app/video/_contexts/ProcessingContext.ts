import { createContext } from "react";
import { ProcessingContextType } from "../_types";

const ProcessingContext = createContext<ProcessingContextType>({
  videoId: "",
  videoTitle: "",
  processingInfo: {
    filename: "",
    title: "",
    artist: "",
    album: "",
    track: "",
    date: "",
    year: "",
    genre: "",
  },
  setProcessingInfo: () => { },
});

export default ProcessingContext;
