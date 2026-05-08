import { AiVendorMapped } from "@/features/ai/types";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface FetchOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}

export interface ApiServerResponse<TData> {
  msg: string;
  data: TData | null;
}

export type ApiResponse<TData> =
  | {
    ok: true;
    status: number;
    msg: string;
    data: TData;
  }
  | {
    ok: false;
    status: number;
    msg: string;
    data: null;
  };

export type ApiDataProcessVideo = string;

export type ApiDataGenrateFileData = {
  filename: string;
  title: string;
  artist: string;
  album: string;
  track: string;
  date: string;
  year: string;
  genre: string;
};

export type ApiDataAiVendors = AiVendorMapped[];
