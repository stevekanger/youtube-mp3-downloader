import styles from '../styles/ConvertAndDownload.module.css'
import { useState } from 'react'
import { useMetaFields, useVideo } from '../store'
import createFilename from '../lib/createFilename'
import LoadingIndicator from './LoadingIndicator'

export default function ConvertAndDownload() {
  const [link, setLink] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const video = useVideo()
  const meta = useMetaFields()
  const filename = createFilename(video, meta)

  async function getConvertedMp3() {
    if (!video) return

    setLoading(true)

    try {
      const response = await fetch('/api/convert-and-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          video,
          meta,
          filename,
        }),
      })

      if (!response.ok) {
        const json = await response.json()
        setErr(json.msg)
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      setLink(url)
    } catch (err) {
      setErr('There was an error during processing.')
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className={`section`}>
        <button className={`btn btn-primary ${styles.downloadBtn}`}>
          <LoadingIndicator />
        </button>
      </div>
    )
  } else if (link) {
    return (
      <div className={`section`}>
        <a
          className={`btn btn-primary ${styles.downloadBtn}`}
          href={link}
          download={filename}
        >
          Download
        </a>
      </div>
    )
  } else if (err) {
    return (
      <div className={`section`}>
        <button className={`btn btn-primary ${styles.downloadBtn}`}>
          {err}
        </button>
      </div>
    )
  } else {
    return (
      <div className={`section`}>
        <button
          onClick={getConvertedMp3}
          className={`btn btn-primary ${styles.downloadBtn}`}
        >
          Convert And Download
        </button>
      </div>
    )
  }
}
