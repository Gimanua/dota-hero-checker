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

/**
 * Determines if a key is printable, some keys like Caps Lock and Shift are not themselves printable
 * @param {String} key
 */
function isPrintableKey (key) {
  return key.length === 1
}

/**
 * Determines if a key is the spacebar key
 * @param {String} key
 */
export function isSpaceKey (key) {
  return key === ' '
}

/**
 * Determines if a key is the backspace key
 * @param {String} key
 */
function isBackspaceKey (key) {
  return key === 'Backspace'
}

/**
 * Determines if a key is the escape key
 * @param {String} key
 */
function isEscapeKey (key) {
  return key === 'Escape'
}

/**
 * Determines what kind of key a key press was
 * @param {String} key
 */
export function getKeyType (key) {
  if (isSpaceKey(key)) return 'space'
  if (isBackspaceKey(key)) return 'backspace'
  if (isEscapeKey(key)) return 'escape'
  if (isPrintableKey(key)) return 'character'
  return 'special'
}
