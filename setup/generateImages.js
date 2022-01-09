const sharp = require('sharp')
const { readdirSync, mkdirSync } = require('fs')
const { readFile } = require('fs/promises')

const assumedBaseWidth = 256
const assumedBaseHeight = 144
const resizeFactors = {
  small: 0.25,
  medium: 0.5,
  large: 1
}

const imageFormats = [
  'avif',
  'webp',
  'jpg',
  'png'
]
const imageSizes = [
  'small',
  'medium',
  'large'
]

const sourceDir = 'src/assets/images/heroes'
const destinationDir = 'public/images/heroes'
const sourceImageNames = readdirSync(sourceDir)

mkdirSync(destinationDir, { recursive: true })

for (const imageName of sourceImageNames) {
  const imagePath = `${sourceDir}/${imageName}`
  readFile(imagePath)
    .then(buffer => {
      const heroName = imageName.substring(0, imageName.lastIndexOf('.'))
      processImage(buffer, heroName)
    })
    .catch(error => { console.error(error) })
}

/**
 * @param {Buffer} imageBuffer
 * @param {String} heroName
 */
function processImage (imageBuffer, heroName) {
  for (const imageFormat of imageFormats) {
    for (const imageSize of imageSizes) {
      try {
        const sharpObject = sharp(imageBuffer)
        const formatted = format(sharpObject, imageFormat)
        const resized = resize(formatted, imageSize)
        resized.toFile(`${destinationDir}/${heroName}-${imageSize}.${imageFormat}`)
          .catch(error => { console.error(error) })
      } catch (error) {
        console.error(error)
      }
    }
  }
}

/**
 * @param {sharp.Sharp} sharpObj
 * @param {'avif'|'webp'|'jpg'|'png'} format
 */
function format (sharpObj, format) {
  if (format === 'avif') return sharpObj.avif()
  if (format === 'webp') return sharpObj.webp()
  if (format === 'jpg') return sharpObj.jpeg()
  return sharpObj.png()
}

/**
 * @param {sharp.Sharp} sharpObj
 * @param {'small'|'medium'|'large'} size
 */
function resize (sharpObj, size) {
  const resizeFactor = resizeFactors[size]
  const width = assumedBaseWidth * resizeFactor
  const height = assumedBaseHeight * resizeFactor
  return sharpObj
    .resize(width, height)
}
