import React from 'react'
import { isPrintableKey } from '../../utils'

const SEARCH_KEY_TIMEOUT_MS = 1500
/**
 * @type {React.Context<String>}
 */
const SearchQueryContext = React.createContext()

/**
 * @param {String} state The current search query state
 * @param {Object} action Information to determine how to modify the query state
 * @param {Boolean} action.timedOut
 * @param {String} action.key
 */
function reduceSearchQuery (state, { timedOut, key }) {
  if (timedOut) {
    if (isPrintableKey(key)) return key.toLowerCase()
    return ''
  }
  if (key === 'Backspace') return state.slice(0, -1)
  if (isPrintableKey(key)) return state + key.toLowerCase()
  return state
}

function SearchQueryProvider ({ children }) {
  const [searchQuery, dispatchSearchQuery] = React.useReducer(reduceSearchQuery, '')

  React.useEffect(function setupKeyListener () {
    document.addEventListener('keydown', handleKeyDown)

    let keyTimeoutId
    let timedOut = false
    /**
     * @param {KeyboardEvent} e
     */
    function handleKeyDown (e) {
      e.preventDefault()
      clearTimeout(keyTimeoutId)
      dispatchSearchQuery({ timedOut, key: e.key })

      if (timedOut) timedOut = false
      keyTimeoutId = setTimeout(() => { timedOut = true }, SEARCH_KEY_TIMEOUT_MS)
    }

    return function cleanup () {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <SearchQueryContext.Provider value={searchQuery}>
      {children}
    </SearchQueryContext.Provider>
  )
}

export default SearchQueryProvider
export { SearchQueryContext }
