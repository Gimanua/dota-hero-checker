import './App.css'
import React from 'react'
import Portrait from '../Portrait'
import Header from '../Header'
import Heroes from '../../assets/heroes.json'
import Modal from '../Modal'
import Markdown from 'markdown-to-jsx'
import ChangelogURL from '../../assets/CHANGELOG.md'
import SearchQueryText from '../SearchQueryText'

function App () {
  const [randomHero, setRandomHero] = React.useState(null)
  const [showChangelog, setShowChangelog] = React.useState(false)
  const [changelog, setChangelog] = React.useState(null)

  React.useEffect(function loadChangelog () {
    window.fetch(ChangelogURL)
      .then(response => response.text())
      .then(setChangelog)
      .catch(error => { console.error(error) })
  }, [])

  return (
    <div className='App'>
      <SearchQueryText />
      {showChangelog &&
        <Modal onClose={() => { setShowChangelog(false) }} specialStyling='changelog'>
          <Markdown>{changelog}</Markdown>
        </Modal>}
      <Header
        onRandomUncheckedHero={hero => { setRandomHero(hero) }}
        onVersionClick={() => { if (changelog) setShowChangelog(true) }}
      />
      {Heroes.map(hero => (
        <Portrait
          key={hero.name}
          name={hero.name}
          internalName={hero.internalName}
          interactable
        />))}
      {randomHero != null &&
        <Modal onClose={() => { setRandomHero(null) }}>
          <Portrait
            name={randomHero.name}
            internalName={randomHero.internalName}
            interactable={false}
          />
        </Modal>}
    </div>
  )
}

export default App
