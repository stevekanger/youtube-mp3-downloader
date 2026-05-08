import { AI_VENDOR_GOOGLE } from "@/constants";
import { ApiDataGenrateFileData } from "@/features/api/types";
import { ApiError } from "@/utils";
import { AiVendorModels } from "../types";

function createPrompt(videoTitle: string) {
  return `From the following title "${videoTitle}. Deduce the song title and artist and give me the following metadata in a valid json string with the following format {filename: "",title: "", artist: "", date: "", year: "", album: "", track: "", genre: ""}. The filename should be in the following format "artist - song title" and should omit special characters not allowed in filenames. All other values should be compatible with ffmpeg's metadata as they will be encoded as metadata to ffmpeg. Genres should be semi-colon seperated with no spaces as the delimiter but the genre themselves may have spaces and must be lowercase with the main genre first in the list. Date should be in simple date format (Year-Month-Day): eg 2023-10-25. The response should only contain a valid json string with the required data as it will be parsed programmatically.`;
}

export function getVendorModels(name: string): AiVendorModels | null {
  switch (name) {
    case AI_VENDOR_GOOGLE:
      return {
        default: "gemini-3-flash-preview",
        all: [
          "gemini-3.1-pro-preview",
          "gemini-3-flash-preview",
          "gemini-3.1-flash-lite-preview",
          "gemini-3.1-flash-live-preview",
          "gemini-2.5-flash",
          "gemini-2.5-flash-lite",
        ],
      };
    default:
      return null;
  }
}

export async function googleFetch(
  key: string,
  model: string,
  videoTitle: string,
): Promise<ApiDataGenrateFileData> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "x-goog-api-key": key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: {
              text: createPrompt(videoTitle),
            },
          },
        ],
      }),
    },
  );

  const data = await res.json();

  if (data?.error) {
    throw new ApiError(502, data.error.message);
  }

  const text = data.candidates[0].content.parts[0].text;
  const parsed = JSON.parse(text);

  return {
    filename: parsed.filename ?? "",
    title: parsed.title ?? "",
    artist: parsed.artist ?? "",
    album: parsed.album ?? "",
    track: parsed.track ?? "",
    date: parsed.date ?? "",
    year: parsed.year ?? "",
    genre: parsed.genre ?? "",
  };
}
