import './App.css'
import React from 'react'
import Portrait from '../Portrait'
import Header from '../Header'
import Heroes from '../../assets/heroes.json'
import Modal from '../Modal'
import CheckedHeroesProvider from '../CheckedHeroesProvider'

function App () {
  const [randomHero, setRandomHero] = React.useState(null)

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
