import './Portrait.css'
import React from 'react'
import CheckImage from '../../assets/images/check.png'
import classNames from 'classnames'
import { CheckedHeroesContext } from '../CheckedHeroesProvider/CheckedHeroesProvider'
import { SearchQueryContext } from '../SearchQueryProvider/SearchQueryProvider'

/**
 * A portrait of a hero
 * @param {Object} props
 * @param {String} props.name The name of the hero
 * @param {String} props.internalName The internal name of the hero
 * @param {String} props.imageSource The source of the image of the hero
 * @param {Boolean} props.interactable If the portrait should be clickable to toggle checked status
 */
function Portrait ({ name, internalName, imageSource, interactable }) {
  const searchQuery = React.useContext(SearchQueryContext)
  const searchMatch = (function isMatch () {
    if (searchQuery.length === 0) return null
    if (searchQuery.length === 1) return name[0].toLowerCase() === searchQuery
    return name.toLowerCase().includes(searchQuery)
  }())
  const [checkedHeroes, updateCheckedHero] = React.useContext(CheckedHeroesContext)

  const checked = checkedHeroes.has(internalName)
  const portraitClasses = classNames('Portrait', {
    'Portrait--searchMatch': searchQuery && searchMatch,
    'Portrait--searchMiss': searchQuery && searchMatch === false
  })

  return (
    <div className={portraitClasses} onClick={interactable ? () => { updateCheckedHero(internalName, !checked) } : undefined}>
      <img className='Portrait-image' src={imageSource} alt={name} />
      {checked && <img className='Portrait-checked' src={CheckImage} alt='Checkmark' />}
      <strong className='Portrait-name'>{name}</strong>
    </div>
  )
}

export default Portrait
