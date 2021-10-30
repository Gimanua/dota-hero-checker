import './Portrait.css'
import React from 'react'
import CheckImage from '../../assets/images/check.png'
import classNames from 'classnames'
import { heroIsChecked, setHeroChecked } from '../../utils'

/**
 * A portrait of a hero
 * @param {Object} props
 * @param {String} props.name The name of the hero
 * @param {String} props.imageSource The source of the image of the hero
 * @param {Boolean} props.interactable If the portrait should be clickable to toggle checked status
 */
function Portrait ({ name, imageSource, interactable }) {
  const [checked, setChecked] = React.useState(heroIsChecked(name))

  React.useEffect(() => {
    setHeroChecked(name, checked)
  }, [name, checked])

  const portraitClasses = classNames('Portrait', {
    'Portrait--checked': checked
  })

  return (
    <div className={portraitClasses} onClick={interactable ? () => { setChecked(!checked) } : undefined}>
      <img className='Portrait-image' src={imageSource} alt={name} />
      {checked && <img className='Portrait-checked' src={CheckImage} alt='Checkmark' />}
      <strong className='Portrait-name'>{name}</strong>
    </div>
  )
}

export default Portrait
