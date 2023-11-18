import styles from '../styles/SearchBar.module.css'
import { useNavigate } from 'react-router-dom'
import { useSearchQuery, setSearchQuery } from '../store'
import youtubeGetSearchResults from '../lib/youtubeGetSearchResults'

export default function SearchBar() {
  const searchQuery = useSearchQuery()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!searchQuery) return

    navigate(`/?q=${encodeURIComponent(searchQuery)}`)

    const searchResults = await youtubeGetSearchResults(searchQuery)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value)
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchBar}
        onChange={handleChange}
        type='text'
        placeholder='Search'
        value={searchQuery}
      />
    </form>
  )
}
