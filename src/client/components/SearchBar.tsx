import styles from '../styles/SearchBar.module.css'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchQuery, setSearchQuery, setSearchSuggestions } from '../store'
import youtubeGetSearchResults from '../lib/youtubeGetSearchResults'
import getSearchSuggestions from '../lib/getSearchSuggestions'
import SearchBarSuggestions from './SearchBarSuggestions'

export default function SearchBar() {
  const formRef = useRef<HTMLFormElement>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchQuery = useSearchQuery()
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    window.addEventListener('click', handleClickOutside)
    window.addEventListener('touchstart', handleClickOutside)
    return () => {
      window.removeEventListener('click', handleClickOutside)
      window.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!searchQuery) return

    navigate(`/?q=${encodeURIComponent(searchQuery)}`)

    setShowSuggestions(false)
    setSearchSuggestions([])
    await youtubeGetSearchResults(searchQuery)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value)
    getSearchSuggestions(e.target.value)
    setShowSuggestions(true)
  }

  function handleFocus() {
    setShowSuggestions(true)
  }

  return (
    <form
      ref={formRef}
      onFocus={handleFocus}
      className={styles.searchForm}
      onSubmit={handleSubmit}
    >
      <input
        className={styles.searchBar}
        onChange={handleChange}
        type='text'
        placeholder='Search'
        value={searchQuery}
      />
      {showSuggestions && <SearchBarSuggestions />}
    </form>
  )
}
