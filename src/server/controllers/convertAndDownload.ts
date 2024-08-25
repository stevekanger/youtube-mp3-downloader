import { Request, Response } from "express";
import { spawn } from "child_process";
import { Readable } from "stream";

export default async function convertAndDownload(req: Request, res: Response) {
  try {
    const { video, meta, filename } = req.body;
    res.header("Content-Disposition", `attachment; filename="${filename}"`);

    const videoUrl = `https://youtube.com/watch?v=${video.id}`;

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

    const inputStream = new Readable({
      read() {}, // No-op, as data is pushed manually
    });

    videoStream.stdout.on("data", (chunk) => {
      inputStream.push(chunk);
    });

    videoStream.on("error", (err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        msg: "There was an error processing video stream.",
      });
    });

    videoStream.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).json({
          success: false,
          msg: "There was an error with yt-dlp.",
        });
      }

      inputStream.push(null);

      // Spawn a new FFmpeg process to add metadata because ytdlp post processor args dont work on streams
      // Arg order matters
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
        `title=${meta.title}`,
        "-metadata",
        `artist=${meta.artist}`,
        "-metadata",
        `album=${meta.album}`,
        "-metadata",
        `genre=${meta.genre}`,
        "-metadata",
        `track=${meta.track}`,
        "-metadata",
        `date=${meta.date}`,
        "-metadata",
        `year=${meta.year}`,
        "pipe:1", // Output to stdout pipe
      ]);

      inputStream.pipe(ffmpegStream.stdin);

      ffmpegStream.on("error", (err) => {
        console.log(err);
        return res.status(500).json({
          success: false,
          msg: "There was an error during processing.",
        });
      });

      ffmpegStream.stdout.pipe(res, { end: true });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "There was an error during processing.",
    });
  }
}
