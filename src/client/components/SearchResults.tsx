import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import youtubeGetSearchResults from '../lib/youtubeGetSearchResults'
import { useSearchResults, useSearchLoading } from '../store'
import SearchResult from './SearchResult'
import LoadingIndicator from './LoadingIndicator'

export default function SearchResults() {
  const loading = useSearchLoading()
  const [searchParams] = useSearchParams()
  const { isFetched, msg, results } = useSearchResults()

  async function checkForInitialResults() {
    const searchParamsQuery = searchParams.get('q')
    if (!isFetched && searchParamsQuery) {
      const searchResults = await youtubeGetSearchResults(searchParamsQuery)
    }
  }

  useEffect(() => {
    checkForInitialResults()
  }, [searchParams])

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
