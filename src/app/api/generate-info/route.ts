import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { videoTitle } = await req.json();

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "x-goog-api-key": "AIzaSyDs99B9PF6--LUxWxwHT2yAbm1yDUv_ncE",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: {
              text: `From the following title "${videoTitle}. Deduce the song title and artist and give me the following metadata "filename ,title, artist, date, year, album, track, genre" in a newline seperated key:value list with the following format key:value\n. If the value of any of these has a \n or : please omit that character. The filename should be in the following format "artist - title". All other values should be compatible with ffmpeg's metadata as they will be encoded as metadata to ffmpeg. Genres should be semi-colon seperated with no spaces as the delimiter but the genre themselves may have spaces and must be lowercase. DO NOT put anything besides the required information as I need to programatically parse the message.`,
            },
          },
        ],
      }),
    });

    const data = await res.json();
    const text = data.candidates[0].content.parts[0].text;
    const parsed = text
      .split("\n")
      .reduce((acc: Record<string, string>, cur: string) => {
        const split = cur.split(":");

        if (split[0] && split[1]) {
          acc[split[0]] = split[1];
        }

        return acc;
      }, {});

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
