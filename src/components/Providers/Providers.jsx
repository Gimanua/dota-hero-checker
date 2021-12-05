import React from 'react'
import CheckedHeroesProvider from '../CheckedHeroesProvider'
import SearchQueryProvider from '../SearchQueryProvider'

function Providers ({ children }) {
  return (
    <CheckedHeroesProvider>
      <SearchQueryProvider>
        {children}
      </SearchQueryProvider>
    </CheckedHeroesProvider>
  )
}

export default Providers
