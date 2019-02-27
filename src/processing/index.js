const imagemin = require('imagemin')
const imageminJpegTran = require('imagemin-jpegtran')
const imageminJpegoptim = require('imagemin-jpegoptim')
const imageminPngquant = require('imagemin-pngquant')
const imageminMozjpeg = require('imagemin-mozjpeg')
const Jimp = require('jimp')

// const model = require('../image-models/carousel')


// * Requirements
// - model to use
// - image input location (also used for output)

const state = {
  output: null,
  model: null,
  path: null,
  file: null,
}

console.log(JSON.stringify(state, 'utf8', 2))

function resize ({ path, file, crop, mainWindow } = {}) {
  console.log({ path, file })
  return new Promise((resolve, reject) => {
    Jimp.read(`${path}/${file}`, (err, image) => {
      if (err) reject(err)
      if (!image) reject(`${image} is not supported`)
      console.log({ image })
      const newFilename = file.replace(/.jpe?g|.png/i, '')
      const destJPG = `${path}/${crop.context}${crop.suffix}/${newFilename}.jpg`
      // const destPNG = `${path}/${crop.context}${crop.suffix}/${newFilename}.png`
      console.log({ destJPG })
      image.resize(crop.width, Jimp.AUTO)
      image.quality(crop.quality.jpg)
      crop.blur && image.blur(crop.blur)
      image.write(destJPG)
      // image.write(destPNG)

      resolve(`${file} done`)
    })

  })
}

function formatting ({ fileList, path, mainWindow } = {}) {
  return new Promise (async (resolve, reject) => {
    for (const file of fileList) {
      console.log('formatting', file, path)
      mainWindow.webContents.send('log', `Formatting: ${path}/${file}`)
      for (const crop of state.model.crops) {
        mainWindow.webContents.send('log', `Crop: ${crop.context}${crop.suffix}`)
        await resize({ path, file, crop })
      }
    }
    resolve()
  })
}


// ! ERROR HERE
// Problem lies with how packaged app handles paths and required for imageOptim?
function compressing ({ path, mainWindow } = {}) {
  return new Promise (async (resolve, reject) => {
    for (const crop of state.model.crops) {
      console.log({ crop })
      console.log('starting compression:', path)
      // const target = `${path}/${crop.context}${crop.suffix}/*.{jpg,png}`
      const target = `${path}/${crop.context}${crop.suffix}/Blackheath-34 images.jpg`
      mainWindow.webContents.send('log', `Compressing: ${target}`)
      console.log({ target })
      const output = `${path}/${crop.context}${crop.suffix}/optim`
      console.log({ output })
      try {
        const processed = await imagemin(
          [ target ],
          output,
          {
            plugins: [
              imageminJpegoptim({
                max: 40,
                stripAll: true,
              }),
              // imageminJpegTran(),
              // imageminMozjpeg(),
              // imageminPngquant({
              //   strip: true,
              //   quality: [0.3, 0.5],
              //   dithering: 0.3,
              // })
            ]
          }
        )
        console.log({ processed })
      } catch (err) {
        console.log('ERROR PROCESSINGG IMAGE', err)
        reject(err)
      }
    }
    resolve()
  })
}


async function processing ({ fileList, path, mainWindow, model } = {}) {
  state.model = model
  console.log({ path })
  console.log({ fileList })
  try {
    await formatting({ fileList, path, mainWindow })
    console.log('\n-------------\nall formatting done\n-------------\n')
    // await compressing({ path, mainWindow })
    console.log('\n-------------\nall compressing done\n-------------\n')
    console.log('\n-------------\neol\n-------------\n')
    // mainWindow.webContents.send('log', `--- All files complete 🤘 ---`)
  } catch (error) {
    throw error
  }
}


module.exports = processing
