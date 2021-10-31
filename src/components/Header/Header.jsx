import './Header.css'
import React from 'react'
import Heroes from '../../assets/heroes.json'
import { heroIsChecked } from '../../utils'
import { version } from '../../../package.json'

/**
 * Page header
 * @param {Object} props
 * @param {Function} props.onRandomUncheckedHero Callback for when a random unchecked hero is selected
 */
function Header ({ onRandomUncheckedHero }) {
  function randomUncheckedHero () {
    const uncheckedHeroes = Heroes.filter(hero => heroIsChecked(hero.internalName) === false)
    if (uncheckedHeroes.length === 0) return
    const randomUncheckedHero = uncheckedHeroes[Math.floor(Math.random() * uncheckedHeroes.length)]
    onRandomUncheckedHero(randomUncheckedHero)
  }

  return (
    <header className='Header'>
      <h1>Dota Hero Checker v{version}</h1>
      <div className='Header-actions'>
        <button className='Header-actionButton' onClick={() => { randomUncheckedHero() }}>Random Unchecked Hero</button>
      </div>
    </header>
  )
}

export default Header
