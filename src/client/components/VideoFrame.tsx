import styles from '../styles/VideoFrame.module.css'

type Props = {
  videoId: string
}

export default function VideoFrame({ videoId }: Props) {
  return (
    <div className='section'>
      <div className={styles.iframeContainer}>
        <iframe
          className={styles.iframe}
          src={`https://youtube.com/embed/${videoId}`}
        ></iframe>
      </div>
    </div>
  )
}
