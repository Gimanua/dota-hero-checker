import './Portrait.css'
import React from 'react'
import CheckImage from '../../assets/images/check.png'
import classNames from 'classnames'
import { CheckedHeroesContext } from '../CheckedHeroesProvider/CheckedHeroesProvider'
import { SearchQueryContext } from '../SearchQueryProvider/SearchQueryProvider'

const BASE_IMAGE_PATH = 'images'

/**
 * A portrait of a hero
 * @param {Object} props
 * @param {String} props.name The name of the hero
 * @param {String} props.internalName The internal name of the hero
 * @param {Boolean} props.interactable If the portrait should be clickable to toggle checked status
 */
function Portrait ({ name, internalName, interactable }) {
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

  const lowerCaseInternalName = internalName.toLowerCase()
  return (
    <div className={portraitClasses} onClick={interactable ? () => { updateCheckedHero(internalName, !checked) } : undefined}>
      <picture>
        <source srcSet={`${BASE_IMAGE_PATH}/avif/${lowerCaseInternalName}.avif`} type='image/avif' />
        <source srcSet={`${BASE_IMAGE_PATH}/webp/${lowerCaseInternalName}.webp`} type='image/webp' />
        <source srcSet={`${BASE_IMAGE_PATH}/jpeg/${lowerCaseInternalName}.jpg`} type='image/jpeg' />
        <img className='Portrait-image' src={`${BASE_IMAGE_PATH}/png/${lowerCaseInternalName}.png`} alt={name} />
      </picture>
      {checked && <img className='Portrait-checked' src={CheckImage} alt='Checkmark' />}
      <strong className='Portrait-name'>{name}</strong>
    </div>
  )
}

export default Portrait
