import config from '../../config'

/**
 * Requests an access and refresh token from spotify oauth.
 * Then sets those tokens and the expiration to localStorage
 *
 * @param code - The access code returned by spotify to the oauth callback url.
 * @returns void.
 */
export default async function spotifyGetAccessToken(code: string) {
  try {
    let codeVerifier = localStorage.getItem('spotify_code_verifier')

    if (!codeVerifier) throw new Error('No code verifier found in localstorage')

    const url = 'https://accounts.spotify.com/api/token'

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: config.spotifyClientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.clientUri + '/auth/spotify/callback',
        code_verifier: codeVerifier,
      }),
    })

    if (!response.ok) throw new Error(`Access token url: ${url} bad response.`)

    const { access_token, refresh_token, expires_in } = await response.json()
    const access_token_exp = (Date.now() + expires_in * 1000).toString()

    localStorage.setItem('spotify_access_token', access_token)
    localStorage.setItem('spotify_access_token_exp', access_token_exp)
    localStorage.setItem('spotify_refresh_token', refresh_token)
    localStorage.removeItem('spotify_code_verifier')

    return { access_token, refresh_token }
  } catch (err) {
    throw err
  }
}
