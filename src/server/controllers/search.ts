import type { SectionRenderer, VideoRenderer, SearchResult } from '../types'
import { Request, Response } from 'express'

/**
 * Parses through the video renderer sections of the json resonse
 *
 * @param renderer - The section renderer data
 * @returns the valid information that is needed id, title, url, duration, thumbnail
 */
function parseVideoRenderer(renderer: VideoRenderer) {
  return {
    id: renderer.videoId,
    title: renderer.title.runs.reduce((a: any, b: any) => a + b.text, ''),
    url: `https://www.youtube.com${renderer.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
    duration: renderer.lengthText ? renderer.lengthText.simpleText : 'Live',
    thumbnailUrl:
      renderer.thumbnail.thumbnails[renderer.thumbnail.thumbnails.length - 1]
        .url,
  }
}

/**
 * parses through the json to get the video renderer section.
 *
 * @param section - these is the different section renderer data that youtube uses.
 * @returns video data from the videoRenderer section.
 */
function parseJson(sections: SectionRenderer[]) {
  const videos: SearchResult[] = []
  sections.forEach((section) => {
    ; (section?.itemSectionRenderer?.contents || []).forEach((renderer) => {
      if (renderer['videoRenderer']) {
        videos.push(parseVideoRenderer(renderer.videoRenderer))
      }
    })
  })
  return videos
}

/**
 * Fetches the data from youtube's search page.
 *
 * @param query - the query that is being searched
 * @returns parsed json.
 */
async function getVideos(query: string) {
  const url = `https://www.youtube.com/results?search_query=${query}`
  const response = await fetch(url)
  const html = await response.text()

  if (!html) return false

  const match = html.match(/ytInitialData[^{]*(.*?);\s*<\/script>/s)
  if (!match) return false

  const data = JSON.parse(match[1])

  const sectionRenderers =
    data?.contents?.twoColumnSearchResultsRenderer?.primaryContents
      ?.sectionListRenderer?.contents || []

  return parseJson(sectionRenderers)
}

/**
 * Controller callback for express. Sends a json response to the client.
 *
 * @param req - Express Request.
 * @param res - Express Response.
 * @returns void.
 */
export default async function search(req: Request, res: Response) {
  try {
    const { query } = req.body
    const data = await getVideos(query)

    if (!data) {
      return res.status(404).json({
        ok: false,
        status: 404,
      })
    }

    res.status(200).json({
      ok: false,
      status: 200,
      data,
    })
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
    })
  }
}
