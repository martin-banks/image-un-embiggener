/* eslint-env node */
/* eslint no-console: 0 */
/* eslint-disable */

// IMAGE MAGICKDOCUMENTATION
// https://www.npmjs.com/package/imagemagick
// https://github.com/rsms/node-imagemagick

const IM = require('imagemagick')
const FS = require('fs')
const MKDIRP = require('mkdirp')
const PATH = require('path')
const C = require('colors')
const MV = require('mv')
const GETSIZE = require('image-size')
const VIBRANT = require('node-vibrant')
const ora = require('ora')
const { spawn } = require('child_process')

// config options for project including image processing spec and locations
// is controlled from a json file in src.
// here it is imported and value destructured
const CFG = require('../../src/content/config/images.config.json')

const args = {
  colors: true,
  thumbs: true,
  rename: true,
}

process.argv
  .slice(0 - process.argv.length + 2)
  .forEach(a => {
    const arg = a.split('=').map(x => x.toLowerCase())
    args[arg[0]] = arg[1] === 'true'
  })

console.log({ args })

const { sizes, thumbBlurLarge, thumbBlurSmall, location: imageLocation, quality } = CFG
const { min, max, inc } = sizes
const thumbSize = sizes.thumb
const imageQuality = quality.image
const thumbQuality = quality.thumb

// define the image location from config to be used for all processes
const images = PATH.join(__dirname, `../../${imageLocation}`)

const renamed = file => {
  if (!args.rename) return file
  return file
    .trim()
    .replace(/_\d+_/, '_')
    .replace(/^_/, '')
    .replace(/ \(.+\)/g, '')
    .replace(/^\d+-/, '')
    // .replace(' ', '_')
    // .split('_')
    // .slice(2, (file.length - 1))
    // .join('_')
    // .toLowerCase()
}

const incrementValues = [... new Array(max / inc)].map((val, i) => (i + 1) * inc)
console.log({ incrementValues })
// in order for the images to be used with js modules, create a js 'manifest' exporting
// each image from that location so they can be programtically accessed by templates
// and make easy use of picture elements with srcset
const manifestTemplate = (name, size, file) => `export { default as ${CFG.jsPrefix || 'Img'}${name} } from './processed/${size}/${file}'`


// Promise based function pieces to enable syncronus processing of images
async function makeDir (path) {
  return new Promise(async (resolve, reject) => {
    MKDIRP(path, err => {
      if (err) reject(`ERROR CREATING DIRECTORY: ${path}\n${err}`)
      resolve(`${path} successfully created`)
    })
  })
}
function makeIncrementDir (size) {
  return new Promise(async (resolve, reject) => {
    try {
      await makeDir(`${images}/processed/${size}`)
      resolve(`${size} created`)
    } catch (err) {
      reject(err)
    }
  })
}
async function convertImage ({ file, options }) {
  return new Promise(async (resolve, reject) => {
    IM.convert(options, error => {
      if (error) reject(error)
      resolve('increment created')
    })
  })
}
async function moveFile (file) {
  return new Promise((resolve, reject) => {
    MV(`${images}/_RAW/${file}`, `${images}/_RAW/_DONE/${file}`, moveError => {
      if (moveError) reject(moveError)
      resolve('written and moved')
    })
  })
}
async function writeFile ({ path, content }) {
  return new Promise((resolve, reject) => {
    FS.writeFile(path, content, writeError => {
      if (writeError) reject(writeError)
      resolve(`${path} created`)
    })
  })
}

// creates the predefinded thumbnail types
async function createThumbs (file) {
  return new Promise(async (resolve, reject) => {
    if (!args.thumbs) {
      resolve('Thumbs skipped')
      return
    }
    await convertImage({ 
      file, 
      options: [
        `${images}/_RAW/${file}`,
        '-resize', thumbSize,
        '-quality', 20,
        '-define',
        'webp:lossless=false',
        `${images}/processed/thumb/${renamed(file).replace('.jpg', '')}.webp`,
      ]
    })
    await convertImage({ 
      file, 
      options: [
        `${images}/_RAW/${file}`,
        '-resize', thumbSize,
        '-quality', thumbQuality,
        `${images}/processed/thumb/${renamed(file)}`,
      ]
    })
    await convertImage({ 
      file, 
      options: [
        `${images}/_RAW/${file}`,
        '-resize', thumbSize,
        '-quality', thumbQuality,
        '-gaussian-blur', `0x${thumbBlurSmall}`,
        `${images}/processed/thumbBlurSmall/${renamed(file)}`,
      ]
    })
    await convertImage({ 
      file, 
      options: [
        `${images}/_RAW/${file}`,
        '-resize', thumbSize,
        '-quality', thumbQuality,
        '-gaussian-blur', `0x${thumbBlurLarge}`,
        `${images}/processed/thumbBlurLarge/${renamed(file)}`,
      ]
    })
    resolve('thumbs complete')
  })
}

// Itterates over the required increment values, creating those versions
// and pushing the information into an array that will be written to file later
async function createImageIncrements ({ file, manifest }) {
  return new Promise(async (resolve, reject) => {
    try {
      for (let [i, val] of incrementValues.entries()) {
        console.log({ i, val })
        const size = inc * (i + 1)
        await convertImage({ 
          file, 
          options: [
            `${images}/_RAW/${file}`,
            '-resize', size,
            '-quality', imageQuality,
            // '-blur', '0x0.05',
            // '-sharpen', '1x1',
            // '-noise', '2',
            `${images}/processed/${val}/${renamed(file)}`,
          ]
        })
        await convertImage({ 
          file, 
          options: [
            `${images}/_RAW/${file}`,
            '-resize', size,
            '-quality', 40,
            '-define',
            'webp:lossless=false method=6',
            `${images}/processed/${val}/${renamed(file).replace('.jpg', '')}.webp`,
          ]
        })
        manifest.push(manifestTemplate(size, size, renamed(file))) 
        // resolve(`${file} - ${size} - created`)
      }
      resolve('All images created for -> ', file)
    } catch (err) {
      reject(err)
    }
  })
}

// Create all thumbnails and image increments
// get image data
// get image color info
// push to array
// write to file
async function createAllImages() {
  return new Promise((resolve, reject) => {
    // first get a list of all images in the folder
    console.log('\n', PATH.join(images, '_RAW'))
    FS.readdir(PATH.join(images, '_RAW'), async (readDirError, files) => {
      if (readDirError) reject(err)
      // Filter that list for unsupported files and begin processing the reaminder
      // -- currently only jpg are supported) --
      const filtered = files.filter(file => file.indexOf('.jpg') !== -1)
      // early resolve promise if there are no files to process
      if (filtered.length === 0) resolve('no images to process')
      writeFile({
        content: JSON.stringify(filtered.map(f => renamed(f)), 'utf-8', 2),
        path: `${__dirname}/images.json`
      })
      // FS.writeFile(`${__dirname}/images.txt`, filtered.stringify(), err => {
      //   if (err) return console.log(err)
      //   console.log('File written')
      // })
      // otherwise itterate over each file
      for (let [i, file] of filtered.entries()) {
        const manifest = []
        try {
          const imageLog = [
            '\n',
            C.bgWhite(' Starting image ').black,
            `${'\ue0b0 '.bgGreen.white}${C.bgGreen(file + ' ').black}${'\ue0b0'.bgWhite.green}`,
            C.bgBlack('\ue0b0').white
          ]
          console.log(imageLog.join(''))
          const imagePath = `${images}/_RAW/${file}`
          await createThumbs(file)
          spinner.succeed(`${file}: Thumbs ${args.thumbs ? 'finished' : 'skipped'}`)
          spinner.start(file)
          await createImageIncrements({ file, manifest })
          spinner.succeed(`${file}: All increments created`)
          spinner.start(file)
          const imgData = await getSizes(imagePath)
          const colors = await getColors(imagePath)
          if (args.thumbs) {
            manifest.push(manifestTemplate('thumb', 'thumb', renamed(file)))
            manifest.push(manifestTemplate('thumbBlurSmall', 'thumbBlurSmall', renamed(file)))
            manifest.push(manifestTemplate('thumbBlurLarge', 'thumbBlurLarge', renamed(file)))
          }
          manifest.push(imgData)
          manifest.push(colors)
          manifest.push('')
          const content = manifest
            .filter(m => m.length)
            .join(';\n')
          await writeFile({ path: `${images}/${renamed(file).split('.jpg')[0]}.js`, content })
          await moveFile(file)
          spinner.stop()
        } catch (err) {
          reject(err)
        }
      }
      resolve('Increments complete')
    })
  })
}

// checks _rgb vales are integers not float
function makeRGBInt (obj) {
  return Object.keys(obj).reduce((prev, key) => {
    const output = prev
    let update = obj[key]
    if (obj[key] && obj[key]._rgb) {
      const fixedRGB = obj[key]._rgb.map(v => Math.round(v))
      update._rgb = fixedRGB
      output[key] = update
    }
    return output
  }, {})
}

function getColors (imagePath) {
  return new Promise ((resolve, rejct) => {
    if (!args.colors) {
      // return resolve(`export const colors = false`)
      return resolve('')
    }
    VIBRANT
      .from(imagePath)
      .getPalette((err, pal) => {
        if (err) return reject(err)
        const colors = makeRGBInt(pal)
        // low color pictures do not always generate a vibrant color pallette
        if (!colors.Vibrant) colors.Vibrant = { _rgb: [0, 0, 0] }
        const colorData = `export const colors = ${JSON.stringify(colors, 'utf-8', 2)}`
        resolve(colorData)
      })
  })
}
function getSizes (imagePath) {
  return new Promise((resolve, rejct) => {
    const fileDimensions = GETSIZE(imagePath)
    const { width, height } = fileDimensions
    const ratio = height / width
    const orientation = width > height ? 'landscape' : 'portrait'
    const imgData = `export const ImgData = { width: ${width}, height: ${height}, ratio: ${ratio}, orientation: '${orientation}' }`
    resolve(imgData)
  })
}

const { optimizeImages } = require('./imageOptim')

// main controller function
async function start () {
  try {
    await makeDir(`${images}/processed/thumb`)
    spinner.succeed('Thumb dir created')

    await makeDir(`${images}/processed/js`)
    spinner.succeed('Processed dir created')

    await makeDir(`${images}/processed/thumbBlurSmall`)
    spinner.succeed('thumbBlurSmall dir created')

    await makeDir(`${images}/processed/thumbBlurLarge`)
    spinner.succeed('thumbBlurLarge dir created')

    await makeDir(`${images}/_RAW/_DONE`)
    spinner.succeed('Thumb dir created')

    for (let [i, val] of incrementValues.entries()) {
      await makeIncrementDir(val)
      spinner.succeed(`${val} dir created`)
    }

    spinner.succeed('All directories done')

    await createAllImages()
    spinner.stop()

    console.log('Optimizing...')
    await optimizeImages()

    const completeLog = [
      '\n',
      C.bgGreen(' ALL IMAGES PROCESSSED ').black,
      '\ue0b0'.bgWhite.green,
      C.bgBlack('\ue0b0').white,
      '\n\n'
    ]
    console.log(completeLog.join(''))
  } catch (err) {
    spinner.fail(err)
    console.log(err)
  }
}

const spinner = ora('Grabbing image ... ').start()
start()
