import { setSearchSuggestions } from '../store'
import { SuggestionResults } from '../types'

/**
 * Removes the script from the document body that was placed there to envoke the jsonp callback.
 *
 * @param script - the script to remove.
 */
function removeScript(script: HTMLScriptElement) {
  if (document.body.contains(script)) {
    document.body.removeChild(script)
  }
}

/**
 * Handles calling the api using jsonp.
 * Adds a script tag to the body with the api call and query callback
 * Then sets the search suggestions
 *
 * @param query - the search query.
 */
export default function getSearchSuggestions(query: string) {
  const callbackName = 'handleApi'

    // for some reason auto format puts a semicolon at the beginning of next line?
    ; (window as any)[callbackName] = (data: SuggestionResults) => {
      if (data[1]) {
        setSearchSuggestions(data[1].map((item) => item[0]))
      }
      removeScript(script)
    }

  const script = document.createElement('script')
  script.src = `https://suggestqueries.google.com/complete/search?client=youtube&q=${query}&callback=${callbackName}`

  script.onerror = () => {
    removeScript(script)
  }

  document.body.appendChild(script)
}
