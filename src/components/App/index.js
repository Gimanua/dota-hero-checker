import './style.css'
import React from 'react'
import Portrait from '../Portrait'

const HERO_DECLARATIONS_URL = '/heroes.json'

export default function App () {
  const [heroes, setHeroes] = React.useState([])

  React.useEffect(() => {
    window.fetch(HERO_DECLARATIONS_URL)
      .then(response => response.json())
      .then(heroes => { setHeroes(heroes) })
      .catch(error => { console.error(error) })
  }, [])

  return (
    <div className='App'>
      {heroes.map(hero => (
        <Portrait
          key={hero.name}
          name={hero.name}
          imageSource={hero.imageSource}
        />))}
    </div>
  )
}
