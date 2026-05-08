import { createContext } from "react";
import { ProcessingInfoData } from "../_types";

interface ProcessingInfoContextType {
  videoId: string;
  videoTitle: string;
  processingInfo: ProcessingInfoData;
  setProcessingInfo: React.Dispatch<React.SetStateAction<ProcessingInfoData>>;
}

const ProcessingInfoContext = createContext<ProcessingInfoContextType>({
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

export default ProcessingInfoContext;
