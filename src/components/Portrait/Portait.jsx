import './Portrait.css'
import React from 'react'
import CheckImage from '../../assets/images/check.png'
import classNames from 'classnames'
import { CheckedHeroesContext } from '../CheckedHeroesProvider/CheckedHeroesProvider'

/**
 * A portrait of a hero
 * @param {Object} props
 * @param {String} props.name The name of the hero
 * @param {String} props.internalName The internal name of the hero
 * @param {String} props.imageSource The source of the image of the hero
 * @param {Boolean} props.interactable If the portrait should be clickable to toggle checked status
 * @param {'match'|'miss'} props.search When searching for a hero this value indicates if the hero should be highlighted or hidden
 */
function Portrait ({ name, internalName, imageSource, interactable, search }) {
  const [checkedHeroes, updateCheckedHero] = React.useContext(CheckedHeroesContext)

  const checked = checkedHeroes.has(internalName)
  const portraitClasses = classNames('Portrait', {
    'Portrait--searchMatch': search === 'match',
    'Portrait--searchMiss': search === 'miss'
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
