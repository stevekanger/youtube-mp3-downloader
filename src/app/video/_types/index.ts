export interface ProcessingContextType {
  videoId: string;
  videoTitle: string;
  processingInfo: ProcessingInfo;
  setProcessingInfo: React.Dispatch<React.SetStateAction<ProcessingInfo>>;
}

export interface ProcessingInfo {
  filename: string;
  title: string;
  artist: string;
  album: string;
  track: string;
  date: string;
  year: string;
  genre: string;
}
