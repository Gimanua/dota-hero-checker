import React from 'react'
import { getAllHeroes, getSavedCheckedHeroesInternalNamesSet, saveHeroChecked } from '../../utils'

/**
 * @callback UpdateCheckedHero
 * @param {String} heroInternalName
 * @param {Boolean} checked
 */

/**
 * @callback SetCheckedHeroesFromArray
 * @param {String[]} heroes
 */

/**
 * @type {React.Context<[Set<String>, UpdateCheckedHero, SetCheckedHeroesFromArray]>}
 */
export const CheckedHeroesContext = React.createContext()

/**
 * A provider for the CheckedHeroesContext
 */
function CheckedHeroesProvider ({ children }) {
  const [checkedHeroes, setCheckedHeroes] = React.useState(getSavedCheckedHeroesInternalNamesSet())

  React.useEffect(() => {
    getAllHeroes()
      .forEach(hero => {
        saveHeroChecked(hero.internalName, checkedHeroes.has(hero.internalName))
      })
  }, [checkedHeroes])

  function updateHeroCheckedStatus (heroInternalName, checked) {
    setCheckedHeroes(previous => {
      const newSet = new Set(previous)
      if (checked) newSet.add(heroInternalName)
      else newSet.delete(heroInternalName)
      return newSet
    })
  }

  function setCheckedHeroesFromArray (heroes) {
    setCheckedHeroes(new Set(heroes))
  }

  return (
    <CheckedHeroesContext.Provider value={[checkedHeroes, updateHeroCheckedStatus, setCheckedHeroesFromArray]}>
      {children}
    </CheckedHeroesContext.Provider>
  )
}

export default CheckedHeroesProvider
