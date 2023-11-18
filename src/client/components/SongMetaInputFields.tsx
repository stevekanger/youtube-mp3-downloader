import { useSpotifyMeta, useMetaFields, setMetaFields } from '../store'
import { useEffect } from 'react'

export default function SongMetaInputFields() {
  const metaFields = useMetaFields()
  const spotifyMeta = useSpotifyMeta()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMetaFields({
      ...metaFields,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    const { currentIndex, results } = spotifyMeta

    if (results[currentIndex]) {
      setMetaFields(results[currentIndex])
    }

    return () => {
      // reset so prev results don't show on new mount
      setMetaFields({
        title: '',
        album: '',
        artist: '',
        genre: '',
        date: '',
        year: '',
        track: 0,
      })
    }
  }, [spotifyMeta])

  return Object.entries(metaFields).map(([key, value]) => (
    <div key={key}>
      <p>{key === 'genre' ? 'genre (seperated by semi-colon)' : key}</p>
      <input name={key} value={value} onChange={handleChange} />
    </div>
  ))
}
