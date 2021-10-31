import Heroes from './assets/heroes.json'

/**
 * Checks if a hero is saved as checked
 * @param {String} heroName The name of the hero to check
 */
export function heroIsSavedAsChecked (heroName) {
  return window.localStorage.getItem(heroName) === 'true'
}

/**
 * Saves a hero as checked or unchecked
 * @param {String} heroName The name of the hero to set check
 * @param {Boolean} checked If true hero will be checked, otherwise unchecked
 */
export function saveHeroChecked (heroName, checked) {
  window.localStorage.setItem(heroName, checked)
}

/**
 * Gets a set of all internal names of heroes that have been saved as checked
 */
export function getSavedCheckedHeroesInternalNamesSet () {
  const checkedHeroesInternalNames = getAllHeroes()
    .filter(hero => heroIsSavedAsChecked(hero.internalName))
    .map(hero => hero.internalName)
  return new Set(checkedHeroesInternalNames)
}

export function getAllHeroes () {
  return Heroes
}
