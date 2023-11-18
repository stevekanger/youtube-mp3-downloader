import styles from '../styles/SearchResult.module.css'
import { Link } from 'react-router-dom'
import { setVideo } from '../store'
import { SearchResult } from '../types'

export default function SearchResult({ data }: { data: SearchResult }) {
  const { id, title, duration, thumbnailUrl } = data

  return (
    <Link
      to={`/video/${id}`}
      className={`section ${styles.searchResult}`}
      onClick={() => setVideo(data)}
    >
      <img src={thumbnailUrl} alt={title} />
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>Duration: {duration}</p>
      </div>
    </Link>
  )
}
