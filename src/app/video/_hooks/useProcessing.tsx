import { useContext } from "react";
import ProcessingContext from "../_contexts/ProcessingContext";

export default function useProcessing() {
  const { videoId, videoTitle, processingInfo, setProcessingInfo } =
    useContext(ProcessingContext);

  return { videoId, videoTitle, processingInfo, setProcessingInfo };
}
