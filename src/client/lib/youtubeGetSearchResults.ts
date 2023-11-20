import { setSearchResults, setSearchLoading } from '../store'

/**
 * Retrieves search results from the /api/search endpoint and sets them.
 * Uses the setSearchResults hook from store to set the results and re render.
 *
 * @param query - The search query.
 * @returns - boolean whether the action was successful or not.
 */
export default async function getSearchResults(
  query: string,
): Promise<boolean> {
  setSearchLoading(true)
  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    })

    if (!response.ok) {
      setSearchResults({
        query: '',
        isFetched: true,
        msg: `There was an error with your request. Please try again`,
        results: [],
      })
      setSearchLoading(false)
      return false
    }

    const { data } = await response.json()

    setSearchResults({
      query,
      isFetched: true,
      msg: data?.length
        ? `Results for ${query}`
        : `No resuts found for ${query}`,
      results: data,
    })
    setSearchLoading(false)
    return true
  } catch (err) {
    setSearchResults({
      query: '',
      isFetched: true,
      msg: `There was an error with your request. Please try again`,
      results: [],
    })
    setSearchLoading(false)
    return false
  }
}
