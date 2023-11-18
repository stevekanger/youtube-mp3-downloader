import type { SearchResult } from '../../client/types'
import { setVideo } from '../store'

/**
 * Retrieves a single video from  the youtube search /api/search.
 * Then sets the video using the setVideo hook from store
 *
 * @param videoId - the id of the video that is being searched for.
 * @returns - boolean whether the action was successful or not.
 */
export default async function getVideo(videoId: string): Promise<boolean> {
  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: videoId,
      }),
    })

    if (!response.ok) {
      setVideo(null)
      return false
    }

    const { data } = await response.json()

    const video = data.find((result: SearchResult) => result.id === videoId)

    if (!video) {
      setVideo(null)
      return false
    }

    setVideo(video)
    return true
  } catch (err) {
    setVideo(null)
    return false
  }
}
