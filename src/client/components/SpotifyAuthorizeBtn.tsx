import spotifyAuthorize from '../lib/spotifyAuthorize'

export default function SpotifyAuthorizeBtn() {
  function handleClick() {
    spotifyAuthorize()
  }

  return (
    <div>
      <p>Use Spotify to authomatically fill in track metadata.</p>
      <button className='btn btn-primary' onClick={handleClick}>
        Authorize Spotify
      </button>
    </div>
  )
}
