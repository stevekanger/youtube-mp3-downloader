import styles from '../styles/SongMetaNav.module.css'
import { useState } from 'react'
import { setSpotifyMeta, useSpotifyMeta } from '../store'
import SongMetaCustomSearch from './SongMetaCustomSearch'

export default function SongMetaNav() {
  const spotifyMeta = useSpotifyMeta()
  const [showSearch, setShowSearch] = useState(false)

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
      <p>Spotify Results: </p>
      <div className='btn-group'>
        <button
          disabled={spotifyMeta.currentIndex < 1}
          onClick={() => handleClick(false)}
          className='btn btn-primary'
        >
          Prev
        </button>
        <button
          onClick={() => setShowSearch(!showSearch)}
          className='btn btn-primary'
        >
          Custom Meta Search
        </button>
        <button onClick={() => handleClick(true)} className='btn btn-primary'>
          Next
        </button>
      </div>

      {showSearch && <SongMetaCustomSearch />}
    </div>
  )
}
