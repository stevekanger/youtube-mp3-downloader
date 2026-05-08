import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { Readable } from "stream";
import { ApiServerResponse, ApiDataProcessVideo } from "@/features/api/types";
import ApiError from "@/utils/ApiError";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiServerResponse<ApiDataProcessVideo>>> {
  try {
    const { id, title, artist, album, track, date, year, genre } =
      await req.json();

    const videoUrl = `https://youtube.com/watch?v=${id}`;

    const videoStream = spawn("yt-dlp", [
      videoUrl,
      "--extract-audio",
      "--audio-format",
      "mp3",
      "--audio-quality",
      "0",
      "-o",
      "-",
    ]);

    const inputStream = new Readable({ read() { } });
    videoStream.stdout.on("data", (chunk) => inputStream.push(chunk));
    videoStream.on("close", () => inputStream.push(null));

    const ffmpegStream = spawn("ffmpeg", [
      "-i",
      "pipe:0", // Input from stdin pipe
      "-codec:a",
      "libmp3lame",
      "-b:a",
      "128k",
      "-f",
      "mp3",
      "-metadata",
      `title=${title}`,
      "-metadata",
      `artist=${artist}`,
      "-metadata",
      `album=${album}`,
      "-metadata",
      `track=${track}`,
      "-metadata",
      `date=${date}`,
      "-metadata",
      `year=${year}`,
      "-metadata",
      `genre=${genre}`,
      "pipe:1", // Output to stdout pipe
    ]);

    inputStream.pipe(ffmpegStream.stdin);

    const base64 = await new Promise<string | null>((resolve, reject) => {
      const chunks: Buffer[] = [];

      ffmpegStream.stdout.on("data", (chunk) => chunks.push(chunk));

      ffmpegStream.stdout.on("end", () =>
        resolve(Buffer.concat(chunks).toString("base64")),
      );

      ffmpegStream.stdout.on("error", () => reject(null));
    });

    return NextResponse.json({
      msg: "Successfully processed video",
      data: base64,
    });
  } catch (err: any) {
    const status = err instanceof ApiError ? err.status : 500;
    return NextResponse.json(
      {
        msg: err.message,
        data: null,
      },
      { status },
    );
  }
}
