import './App.css'
import React from 'react'
import Portrait from '../Portrait'
import Header from '../Header'
import Heroes from '../../assets/heroes.json'
import Modal from '../Modal'
import CheckedHeroesProvider from '../CheckedHeroesProvider'

const SEARCH_KEY_TIMEOUT_MS = 1500

function App () {
  const [randomHero, setRandomHero] = React.useState(null)
  const [search, setSearch] = React.useState('')

  React.useEffect(function setupKeyListener () {
    document.addEventListener('keydown', handleKeyDown)

    let keyTimeoutId
    let timedOut = false
    /**
     * @param {KeyboardEvent} e
     */
    function handleKeyDown (e) {
      clearTimeout(keyTimeoutId)
      if (timedOut) {
        timedOut = false
        setSearch(e.key === 'Backspace' ? '' : e.key)
      } else {
        setSearch(oldSearch => e.key === 'Backspace' ? oldSearch.slice(0, -1) : oldSearch + e.key)
      }
      keyTimeoutId = setTimeout(() => { timedOut = true }, SEARCH_KEY_TIMEOUT_MS)
    }

    return function cleanup () {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className='App'>
      <CheckedHeroesProvider>
        <Header onRandomUncheckedHero={hero => { setRandomHero(hero) }} />
        {Heroes.map(hero => (
          <Portrait
            key={hero.name}
            name={hero.name}
            internalName={hero.internalName}
            imageSource={hero.imageSource}
            interactable
            search={search && (hero.name.toLowerCase().includes(search) ? 'match' : 'miss')}
          />))}
        {randomHero != null &&
          <Modal onClose={() => { setRandomHero(null) }}>
            <Portrait
              name={randomHero.name}
              internalName={randomHero.internalName}
              imageSource={randomHero.imageSource}
              interactable={false}
            />
          </Modal>}
      </CheckedHeroesProvider>
    </div>
  )
}

export default App
