import {
  SearchResult,
  SectionRenderer,
  VideoCountTextRun,
  VideoRenderer,
} from "../types";

/**
 * Parses through the video renderer sections of the json resonse
 *
 * @param renderer - The section renderer data
 * @returns The valid information that is needed id, title, url, duration, thumbnail
 */
function parseVideoRenderer(renderer: VideoRenderer): SearchResult {
  return {
    id: renderer.videoId,
    title: renderer.title.runs.reduce(
      (a: string, b: VideoCountTextRun) => a + b.text,
      "",
    ),
    url: `https://www.youtube.com${renderer.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
    duration: renderer.lengthText ? renderer.lengthText.simpleText : "Live",
    thumbnailUrl:
      renderer.thumbnail.thumbnails[renderer.thumbnail.thumbnails.length - 1]
        .url,
    publishedAt: renderer.publishedTimeText?.simpleText || "No info",
    views: renderer.viewCountText.simpleText,
  };
}

/**
 * parses through the json to get the video renderer section.
 *
 * @param section - These is the different section renderer data that youtube uses.
 * @returns Video data from the videoRenderer section.
 */
function parseJson(sections: SectionRenderer[]): SearchResult[] {
  const videos: SearchResult[] = [];

  sections.forEach((section) => {
    (section?.itemSectionRenderer?.contents || []).forEach((renderer) => {
      if (renderer["videoRenderer"]) {
        videos.push(parseVideoRenderer(renderer.videoRenderer));
      }
    });
  });

  return videos;
}

/**
 * Fetches the data from youtube's search page.
 *
 * @param query - The query that is being searched
 * @returns parsed json.
 */
export default async function getSearchResults(
  query: string,
): Promise<SearchResult[]> {
  const url = `https://www.youtube.com/results?search_query=${query}`;
  const response = await fetch(url);
  const html = await response.text();

  if (!html) return [];

  const match = html.match(/ytInitialData[^{]*(.*?);\s*<\/script>/s);
  if (!match) return [];

  const data = JSON.parse(match[1]);

  const sectionRenderers =
    data?.contents?.twoColumnSearchResultsRenderer?.primaryContents
      ?.sectionListRenderer?.contents || [];

  return parseJson(sectionRenderers);
}
