import { useSearchParams, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import youtubeGetSearchResults from '../lib/youtubeGetSearchResults'
import { useSearchResults, useSearchLoading } from '../store'
import SearchResult from './SearchResult'
import LoadingIndicator from './LoadingIndicator'

export default function SearchResults() {
  const loading = useSearchLoading()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { isFetched, msg, results, query } = useSearchResults()

  async function checkForInitialResults() {
    const searchParamsQuery = searchParams.get('q')
    if (
      (!isFetched && searchParamsQuery) ||
      (searchParamsQuery && query !== searchParamsQuery)
    ) {
      await youtubeGetSearchResults(searchParamsQuery)
    }
  }

  useEffect(() => {
    checkForInitialResults()
  }, [searchParams, location.pathname])

  if (loading) {
    return <LoadingIndicator />
  }

  if (!results.length) return <p>{msg}</p>

  return (
    <div className='searchResults'>
      {results.map((result: any) => (
        <SearchResult key={result.id} data={result} />
      ))}
    </div>
  )
}
