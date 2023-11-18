import styles from '../styles/SongMeta.module.css'
import { useEffect } from 'react'
import { useVideo, useSpotifyMeta, setSpotifyMeta } from '../store'
import spotifyGetSongMeta from '../lib/spotifyGetSongMeta'
import SongMetaInputFields from './SongMetaInputFields'
import SongMetaNav from './SongMetaNav'
import SpotifyAuthorizeBtn from './SpotifyAuthorizeBtn'

export default function SongMeta() {
  const video = useVideo()
  const spotifyMeta = useSpotifyMeta()

  async function fetchSpotifyData() {
    if (!video) return
    try {
      await spotifyGetSongMeta(video.title, video.id)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    // clear meta before so prev results don't show
    setSpotifyMeta((prev) => ({
      videoId: undefined,
      isAuthorized: prev.isAuthorized,
      currentIndex: 0,
      results: [],
    }))
    fetchSpotifyData()
  }, [])

  return (
    <div className={`section ${styles.songMeta}`}>
      <h2>Track Metadata</h2>
      {spotifyMeta.isAuthorized ? <SongMetaNav /> : <SpotifyAuthorizeBtn />}

      <SongMetaInputFields />
    </div>
  )
}
