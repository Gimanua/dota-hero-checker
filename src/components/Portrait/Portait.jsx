import './Portrait.css'
import React from 'react'
import CheckImage from '../../assets/images/check.png'
import classNames from 'classnames'

/**
 * A portrait of a hero
 * @param {Object} props
 * @param {String} props.name The name of the hero
 * @param {String} props.imageSource The source of the image of the hero
 */
export default function Portrait ({ name, imageSource }) {
  const [checked, setChecked] = React.useState(window.localStorage.getItem(name) === 'true')

  React.useEffect(() => {
    window.localStorage.setItem(name, checked)
  }, [name, checked])

  const portraitClasses = classNames('Portrait', {
    'Portrait--checked': checked
  })

  return (
    <div className={portraitClasses} onClick={() => { setChecked(!checked) }}>
      <img className='Portrait-image' src={imageSource} alt={name} />
      {checked && <img className='Portrait-checked' src={CheckImage} alt='Checkmark' />}
      <strong className='Portrait-name'>{name}</strong>
    </div>
  )
}
