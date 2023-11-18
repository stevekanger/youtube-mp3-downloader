import type { SpotifyTrackResults, SpotifyTrackItem } from '../types'
import { setSpotifyMeta } from '../store'
import refreshTokens from './spotifyRefreshTokens'
import { SpotifyArtistResults } from '../types/SpotifyArtistResults'

/**
 * Checks localStorage for the spotify_access_token_exp.
 * Then checks if the current time is less than the exp time
 *
 * @returns boolean based on whether the current time is less than exp time.
 */
function tokenExpired() {
  let tokenExp = localStorage.getItem('spotify_access_token_exp')
  if (!tokenExp) return false

  return Date.now() > +tokenExp
}

/**
 * Searches the spotify tracks for a given query.
 *
 * @param query - The value to search for.
 * @returns the results of the searched query.
 */
async function getTracks(query: string): Promise<SpotifyTrackResults> {
  try {
    const access_token = localStorage.getItem('spotify_access_token')

    if (!access_token)
      throw new Error('No access token found in localStorage to get data.')

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query,
    )}&type=track&limit=10`

    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    })

    if (!response.ok)
      throw new Error(`Spotify Search url: ${url} bad response.`)

    const json: SpotifyTrackResults = await response.json()

    return json
  } catch (err) {
    throw err
  }
}

/**
 * Searches the spotify artists for the given artist id.
 *
 * @param artisId - The value to search for.
 * @returns the results of the searched query.
 */
async function getGenre(artistId: string): Promise<string> {
  try {
    const access_token = localStorage.getItem('spotify_access_token')

    if (!access_token)
      throw new Error('No access token found in localStorage to get data.')

    const url = `https://api.spotify.com/v1/artists/${artistId}`

    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    })

    if (!response.ok)
      throw new Error(`Spotify artist url: ${url} bad response.`)

    const json: SpotifyArtistResults = await response.json()

    return json.genres.reduce((a: string, b: string, index: number) => {
      return index === 0 ? b : `${a};${b}`
    }, '')
  } catch (err) {
    throw err
  }
}

/**
 * Gets the song meta results from the spotify api.
 * Sets the song meta results using the setSpotifyMeta hook from store.
 *
 * @param query - This will be the title of the youtube video.
 * @returns - boolean whether the action was successful or not.
 */
export default async function spotifyGetSongMeta(
  query: string,
  videoId: string,
) {
  try {
    if (tokenExpired()) {
      await refreshTokens()
    }

    const trackResults = await getTracks(query)
    const artistId = trackResults?.tracks.items[0].artists[0].id
    const genre = await getGenre(artistId)
    const metaItems = trackResults.tracks.items.map(
      (item: SpotifyTrackItem) => {
        return {
          title: item?.name || '',
          album: item?.album?.name || '',
          artist: item?.artists[0]?.name || '',
          date: item?.album?.release_date || '',
          year: item?.album?.release_date?.split('-')[0] || '',
          track: item?.track_number || 0,
          genre,
        }
      },
    )

    setSpotifyMeta({
      videoId,
      isAuthorized: true,
      currentIndex: 0,
      results: metaItems,
    })
  } catch (err) {
    setSpotifyMeta({
      videoId: undefined,
      isAuthorized: false,
      currentIndex: 0,
      results: [],
    })
    throw err
  }
}
