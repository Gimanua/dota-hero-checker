import React from 'react'
import { SearchQueryContext } from '../SearchQueryProvider/SearchQueryProvider'
import './SearchQueryText.css'

function SearchQueryText () {
  /**
   * @type {React.MutableRefObject<HTMLDivElement>}
   */
  const searchQueryTextElement = React.useRef()
  const searchQuery = React.useContext(SearchQueryContext)

  React.useEffect(function restartFadeOutAnimation () {
    const textElement = searchQueryTextElement.current

    // Here we manually override the animation to 'none', then trigger a reflow and then remove the override so the animation starts again
    // See https://stackoverflow.com/a/45036752/14223229

    textElement.style.animation = 'none'
    // eslint-disable-next-line
    textElement.offsetHeight
    textElement.style.animation = null
  }, [searchQuery])

  return (
    <div className='SearchQueryText' ref={searchQueryTextElement}>{searchQuery}</div>
  )
}

export default SearchQueryText
