/**
 * Checks if a hero is checked
 * @param {String} heroName The name of the hero to check
 */
export function heroIsChecked (heroName) {
  return window.localStorage.getItem(heroName) === 'true'
}

/**
 * Sets a hero as checked or unchecked
 * @param {String} heroName The name of the hero to set check
 * @param {Boolean} checked If true hero will be checked, otherwise unchecked
 */
export function setHeroChecked (heroName, checked) {
  window.localStorage.setItem(heroName, checked)
}
