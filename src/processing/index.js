const imagemin = require('imagemin')
const imageminJpegTran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const Jimp = require('jimp')

const model = require('../image-models/carousel')


// * Requirements
// - model to use
// - image input location (also used for output)

const state = {
  output: null,
  model: require('../image-models/carousel'),
  path: null,
  file: null,
}

console.log(JSON.stringify(state, 'utf8', 2))

function resize ({ path, file, crop } = {}) {
  console.log({ path, file })
  return new Promise((resolve, reject) => {
    Jimp.read(`${path}/${file}`, (err, image) => {
      if (err) reject(err)
      if (!image) reject(`${image} is not supported`)
      console.log({ image })
      const newFilename = file.replace(/.jpg/i, `${crop.suffix}.jpg`)
      const dest = `${path}/${crop.context}${crop.suffix}/${newFilename}`
      console.log({ dest })
      image
        .resize(crop.width, Jimp.AUTO)
        .quality(crop.quality.jpg)
        .write(dest)

      resolve(`${file} done`)
    })
  })
}

function formatting ({ fileList, path } = {}) {
  return new Promise (async (resolve, reject) => {
    for (const file of fileList) {
      console.log('formatting', file, path)
      for (const crop of model.crops) {
        await resize({ path, file, crop })
      }
    }
    resolve()
  })
}


function compressing ({ path } = {}) {
  console.log('starting compression:', path)
  const target = `${path}/*.{jpg,png}`
  console.log({ target })
  const output = `${path}/optim`
  console.log({ output })
  return new Promise (async (resolve, reject) => {
    const processed = await imagemin(
      [ target ],
      output,
      {
        plugins: [
          imageminJpegTran({ quality: 10 }),
          imageminPngquant()
        ]
      }
    )
    resolve()

    console.log({ processed })
  })
}


async function processing ({ fileList, path } = {}) {
  console.log({ path })
  console.log({ fileList })
  try {
    await formatting({ fileList, path })
    console.log('\n-------------\nall formatting done\n-------------\n')
    await compressing({ path: `${path}/resize` })
    console.log('\n-------------\nall compressing done\n-------------\n')
    console.log('\n-------------\neol\n-------------\n')
  } catch (error) {
    throw error
  }
}


module.exports = processing
