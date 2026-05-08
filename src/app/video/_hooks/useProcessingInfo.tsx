import { useContext } from "react";
import ProcessingInfoContext from "../_contexts/ProcessingInfoContext";

export default function useProcessingInfo() {
  const { videoId, videoTitle, processingInfo, setProcessingInfo } = useContext(
    ProcessingInfoContext,
  );

  return { videoId, videoTitle, processingInfo, setProcessingInfo };
}
