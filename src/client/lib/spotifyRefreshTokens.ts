import config from '../../config'

/**
 * Refreshes the access and refresh tokens used for spotify api.
 * Then sets the values to localStorage
 *
 * @returns boolean if the action is successful or not.
 */
export default async function refreshTokens(): Promise<boolean> {
  try {
    const refreshToken = localStorage.getItem('spotify_refresh_token')

    if (!refreshToken) {
      throw new Error(
        'No refresh token found in localStorage to refresh tokens.',
      )
    }

    const url = 'https://accounts.spotify.com/api/token'

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: config.spotifyClientId,
      }),
    })

    if (!response.ok) {
      throw new Error(`Refresh Tokens url: ${url} bad response.`)
    }

    const json = await response.json()

    const { access_token, refresh_token, expires_in } = json
    const access_token_exp = (Date.now() + expires_in * 1000).toString()

    localStorage.setItem('spotify_access_token', access_token)
    localStorage.setItem('spotify_access_token_exp', access_token_exp)
    localStorage.setItem('spotify_refresh_token', refresh_token)

    return true
  } catch (err) {
    localStorage.removeItem('spotify_access_token')
    localStorage.removeItem('spotify_access_token_exp')
    localStorage.removeItem('spotify_refresh_token')

    throw err
  }
}
