import styles from '../styles/SongMetaNav.module.css'
import { setSpotifyMeta, useSpotifyMeta } from '../store'

export default function SongMetaNav() {
  const spotifyMeta = useSpotifyMeta()

  function handleClick(isNext: boolean) {
    if (isNext && spotifyMeta.results.length - 1 <= spotifyMeta.currentIndex) {
      return
    } else if (!isNext && spotifyMeta.currentIndex < 1) {
      return
    }

    setSpotifyMeta({
      ...spotifyMeta,
      currentIndex: isNext
        ? spotifyMeta.currentIndex + 1
        : spotifyMeta.currentIndex - 1,
    })
  }

  return (
    <div className={styles.songMetaNav}>
      <div className='btn-group'>
        <button
          disabled={spotifyMeta.currentIndex < 1}
          onClick={() => handleClick(false)}
          className='btn btn-primary'
        >
          Prev
        </button>
        <button onClick={() => handleClick(true)} className='btn btn-primary'>
          Next
        </button>
      </div>
    </div>
  )
}
