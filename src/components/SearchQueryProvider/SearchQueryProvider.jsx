import React from 'react'
import { getKeyType } from '../../utils'

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
  switch (getKeyType(key)) {
    case 'backspace':
      if (timedOut) return ''
      return state.slice(0, -1)
    case 'character':
      if (timedOut) return key.toLowerCase()
      return state + key.toLowerCase()
    case 'escape':
      return ''
    case 'space':
      if (state === '') return ''
      if (state.endsWith(' ')) return state
      return state + key.toLowerCase()
    default: return state
  }
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
