import styles from '../styles/SongMetaCustomSearch.module.css'
import { useState } from 'react'
import spotifyGetSongMeta from '../lib/spotifyGetSongMeta'
import { useVideo } from '../store'

export default function SongMetaCustomSearch() {
  const [input, setInput] = useState('')
  const video = useVideo()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
  }

  function handleSubmit(e: React.FormEvent) {
    if (!video?.id || !input) return

    e.preventDefault()
    spotifyGetSongMeta(input, video.id)
  }

  return (
    <>
      <p>Custom Search</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          value={input}
          onChange={handleChange}
          placeholder='Your custom search term'
        />
        <button type='submit' className={`btn btn-primary ${styles.submitBtn}`}>
          Go
        </button>
      </form>
    </>
  )
}
