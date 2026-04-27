import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { videoTitle } = await req.json();

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "x-goog-api-key": process.env.GEMINI_API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: {
              text: `From the following title "${videoTitle}. Deduce the song title and artist and give me the following metadata in a valid json string with the following format {filename: "",title: "", artist: "", date: "", year: "", album: "", track: "", genre: ""}. The filename should be in the following format "artist - song title" and should omit special characters not allowed in filenames. All other values should be compatible with ffmpeg's metadata as they will be encoded as metadata to ffmpeg. Genres should be semi-colon seperated with no spaces as the delimiter but the genre themselves may have spaces and must be lowercase. Date should be in simple date format (Year-Month-Day): eg 2023-10-25. The response should only contain a valid json string with the required data as it will be parsed programmatically.`,
            },
          },
        ],
      }),
    });

    const data = await res.json();
    const text = data.candidates[0].content.parts[0].text;
    const parsed = JSON.parse(text);

    return NextResponse.json({
      success: true,
      msg: "Successfully retreived data",
      data: {
        filename: parsed.filename ?? "",
        title: parsed.title ?? "",
        artist: parsed.artist ?? "",
        album: parsed.album ?? "",
        track: parsed.track ?? "",
        date: parsed.date ?? "",
        year: parsed.year ?? "",
        genre: parsed.genre ?? "",
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      msg: err.msg,
      data: {
        filename: "",
        title: "",
        artist: "",
        album: "",
        track: "",
        date: "",
        year: "",
        genre: "",
      },
    });
  }
}
