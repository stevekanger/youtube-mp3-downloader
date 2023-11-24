import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import spotifyGetAccessToken from '../lib/spotifyGetAccessToken'
import LoadingIndicator from './LoadingIndicator'

export default function SpotifyAuthCallback() {
  const [loading, setLoading] = useState(false)
  const [referer, setReferer] = useState<string | null>(null)
  const [authorized, setAuthorized] = useState(false)
  const [searchParams] = useSearchParams()

  async function authorize() {
    setLoading(true)
    try {
      const code = searchParams.get('code')
      if (!code) return

      const referer = localStorage.getItem('spotify_oauth_referer')
      if (referer) {
        setReferer(referer)
        localStorage.removeItem('spotify_oauth_referer')
      }

      const access = await spotifyGetAccessToken(code)
      if (!access) return

      setAuthorized(true)
      setLoading(false)
    } catch (err) { }

    setLoading(false)
  }

  useEffect(() => {
    authorize()
  }, [])

  if (loading) return <LoadingIndicator />

  return (
    <div>
      <h1>Spotify Callback</h1>
      <p>
        {authorized
          ? 'You can now use spotify for music meta.'
          : 'There was an issue verifying you with Spotify'}
      </p>

      {referer && <Link to={referer}>Return to video</Link>}
    </div>
  )
}
