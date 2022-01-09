import './Header.css'
import React from 'react'
import { getAllHeroes } from '../../utils'
import packageInfo from '../../../package.json'
import { CheckedHeroesContext } from '../CheckedHeroesProvider/CheckedHeroesProvider'

const { version } = packageInfo

/**
 * Page header
 * @param {Object} props
 * @param {Function} props.onRandomUncheckedHero Callback for when a random unchecked hero is selected
 * @param {Function} props.onVersionClick Callback for when the project version is clicked
 */
function Header ({ onRandomUncheckedHero, onVersionClick }) {
  const [checkedHeroes, , setCheckedHeroesFromArray] = React.useContext(CheckedHeroesContext)
  /**
   * @type {React.MutableRefObject<HTMLAnchorElement>}
   */
  const exportRef = React.useRef(null)
  /**
   * @type {React.MutableRefObject<HTMLInputElement>}
   */
  const importRef = React.useRef(null)

  function randomUncheckedHero () {
    const uncheckedHeroes = getAllHeroes()
      .filter(hero => checkedHeroes.has(hero.internalName) === false)
    if (uncheckedHeroes.length === 0) return
    const randomUncheckedHero = uncheckedHeroes[Math.floor(Math.random() * uncheckedHeroes.length)]
    onRandomUncheckedHero(randomUncheckedHero)
  }

  function checkedHeroesAsData () {
    const checkedHeroesAsArray = [...checkedHeroes]
    const base64 = window.btoa(JSON.stringify(checkedHeroesAsArray, null, 2))
    return `data:text/json;base64,${base64}`
  }

  function clickExportElement () {
    exportRef.current.click()
  }

  function clickImportElement () {
    importRef.current.click()
  }

  /**
   * @param {File} file
   */
  function importCheckedHeroesFromFile (file) {
    file.text()
      .then(text => {
        /**
         * In theory this should be a string array, but we do some checks to confirm it really is
         * since this is uploaded from a user
         * @type {String[]}
         */
        const checkedHeroes = JSON.parse(text)
        if (Array.isArray(checkedHeroes) === false) return Promise.reject(new Error('Uploaded file was not a JSON array'))
        else if (checkedHeroes.every(value => typeof value === 'string') === false) {
          return Promise.reject(new Error('Uploaded file contained a JSON array with at least 1 value that was not a string'))
        }
        setCheckedHeroesFromArray(checkedHeroes)
      })
      .catch(error => { console.error(error) })
  }

  /**
   * @param {Number} percentage
   */
  function roundPercentage (percentage) {
    return `~${percentage.toFixed(1)}`
  }

  const checkedHeroesCount = checkedHeroes.size
  const totalHeroesCount = getAllHeroes().length
  const percentageChecked = checkedHeroesCount / totalHeroesCount * 100
  const hasDecimals = Number.isInteger(percentageChecked) === false

  return (
    <header className='Header'>
      <h1>Dota Hero Checker <span className='Header-projectVersion' onClick={() => { onVersionClick() }}>v{version}</span></h1>
      <h2>{checkedHeroesCount} / {totalHeroesCount} checked heroes ({hasDecimals ? roundPercentage(percentageChecked) : percentageChecked}%)</h2>
      <div className='Header-actions'>
        <button className='Header-actionButton' onClick={() => { randomUncheckedHero() }}>Random Unchecked Hero</button>
        <button className='Header-actionButton' onClick={() => { clickExportElement() }}>
          Export
          <a
            className='Header-actionButton-export'
            href={checkedHeroesAsData()}
            download='checked-heroes.json'
            ref={exportRef}
          >
            Export
          </a>
        </button>
        <button className='Header-actionButton' onClick={() => { clickImportElement() }}>
          Import
          <input
            className='Header-actionButton-import'
            type='file'
            accept='.json'
            ref={importRef}
            onChange={e => { importCheckedHeroesFromFile(e.target.files[0]) }}
          />
        </button>
      </div>
    </header>
  )
}

export default Header
