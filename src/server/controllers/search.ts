import type { SectionRenderer, VideoRenderer, SearchResult } from '../types'
import { Request, Response } from 'express'

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
