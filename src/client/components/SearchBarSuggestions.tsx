import styles from '../styles/SearchBarSuggestions.module.css'
import { useEffect, useState } from 'react'
import { useSearchSuggestions, setSearchQuery } from '../store'

export default function SearchBarSuggestions() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const suggestions = useSearchSuggestions()

  function handleClick(suggestion: string) {
    setSearchQuery(suggestion)
  }

  function changeActiveIndex(i: number) {
    const newIndex = Math.max(Math.min(suggestions.length - 1, i), 0)
    setActiveIndex(newIndex)
    setSearchQuery(suggestions[newIndex])
  }

  function handleKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        changeActiveIndex(activeIndex !== null ? activeIndex + 1 : 0)
        return
      case 'ArrowUp':
        changeActiveIndex(activeIndex !== null ? activeIndex - 1 : 0)
        return
      default:
        return
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [activeIndex, suggestions])

  if (suggestions.length)
    return (
      <ul className={styles.suggestions}>
        {suggestions.map((suggestion, index) => {
          return (
            <li
              key={suggestion}
              className={`${index === activeIndex ? styles.active : ''}`}
              onClick={() => handleClick(suggestion)}
            >
              {suggestion}
            </li>
          )
        })}
      </ul>
    )
}
