import './Portrait.css'
import React from 'react'
import CheckImage from '../../assets/images/check.png'
import classNames from 'classnames'
import { CheckedHeroesContext } from '../CheckedHeroesProvider/CheckedHeroesProvider'
import { SearchQueryContext } from '../SearchQueryProvider/SearchQueryProvider'

const BASE_HEROES_IMAGE_PATH = 'images/heroes'
const IMAGE_SIZES = Object.freeze({
  small: 64,
  medium: 128,
  large: 256
})

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
  const [avifSrcSet, webpSrcSet, jpegSrcSet] = (function generateSrcSets () {
    const avifSrcSets = []
    const webpSrcSets = []
    const jpegSrcSets = []
    for (const [imageSize, imageWidth] of Object.entries(IMAGE_SIZES)) {
      avifSrcSets.push(`${BASE_HEROES_IMAGE_PATH}/${lowerCaseInternalName}-${imageSize}.avif ${imageWidth}w`)
      webpSrcSets.push(`${BASE_HEROES_IMAGE_PATH}/${lowerCaseInternalName}-${imageSize}.webp ${imageWidth}w`)
      jpegSrcSets.push(`${BASE_HEROES_IMAGE_PATH}/${lowerCaseInternalName}-${imageSize}.jpg ${imageWidth}w`)
    }
    return [avifSrcSets.join(', '), webpSrcSets.join(', '), jpegSrcSets.join(', ')]
  }())
  const pngSrc = `${BASE_HEROES_IMAGE_PATH}/${lowerCaseInternalName}.png`

  // The "sizes" attribute on the "source" elements must match the width it will be displayed at,
  // this value therefore needs to match whatever value is specified in the CSS so double check before changing!
  return (
    <div className={portraitClasses} onClick={interactable ? () => { updateCheckedHero(internalName, !checked) } : undefined}>
      <picture>
        <source type='image/avif' srcSet={avifSrcSet} sizes='8vw' />
        <source type='image/webp' srcSet={webpSrcSet} sizes='8vw' />
        <source type='image/jpeg' srcSet={jpegSrcSet} sizes='8vw' />
        <img className='Portrait-image' src={pngSrc} alt={name} />
      </picture>
      {checked && <img className='Portrait-checked' src={CheckImage} alt='Checkmark' />}
      <strong className='Portrait-name'>{name}</strong>
    </div>
  )
}

export default Portrait
