import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import SongMeta from './SongMeta'
import { useVideo } from '../store'
import getVideo from '../lib/getVideo'
import LoadingIndicator from './LoadingIndicator'
import VideoFrame from './VideoFrame'
import ConvertAndDownload from './ConvertAndDownload'

export default function Video() {
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const { videoId } = useParams()
  const video = useVideo()

  async function getVideoInitialData() {
    if (!videoId || video?.id === videoId) return

    setLoading(true)
    await getVideo(videoId)
    setLoading(false)
  }

  useEffect(() => {
    document.documentElement.scrollTo(0, 0)
    getVideoInitialData()
  }, [location.pathname])

  if (loading) return <LoadingIndicator />

  if (!video || !videoId) return <p>No video information was found.</p>

  return (
    <div>
      <h1>{video.title}</h1>
      <p>
        Watch on youtube -{' '}
        <a target='_blank' href={`https://youtube.com/watch?v=${video.id}`}>
          http://youtube.com/watch?{video.id}
        </a>
      </p>
      <VideoFrame videoId={video.id} />
      <ConvertAndDownload />
      <SongMeta />
    </div>
  )
}
