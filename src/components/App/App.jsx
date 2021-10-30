import './App.css'
import React from 'react'
import Portrait from '../Portrait'
import Header from '../Header'
import Heroes from '../../assets/heroes.json'
import Modal from '../Modal'

function App () {
  const [randomHero, setRandomHero] = React.useState(null)

  return (
    <div className='App'>
      <Header onRandomUncheckedHero={hero => { setRandomHero(hero) }} />
      {Heroes.map(hero => (
        <Portrait
          key={hero.name}
          name={hero.name}
          imageSource={hero.imageSource}
          interactable
        />))}
      {randomHero != null &&
        <Modal onClose={() => { setRandomHero(null) }}>
          <Portrait
            name={randomHero.name}
            imageSource={randomHero.imageSource}
            interactable={false}
          />
        </Modal>}
    </div>
  )
}

export default App
