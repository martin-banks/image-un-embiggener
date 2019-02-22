const imagemin = require('imagemin')
const imageminJpegTran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')

const Jimp = require('jimp')

// * Requirements
// - model to use
// - image input location (also used for output)

const state = {
  output: null,
  model: null,
  path: null,
  file: null,
}

function resize ({ path, file } = {}) {
  console.log({ path, file })
  return new Promise((resolve, reject) => {
    Jimp.read(`${path}/${file}`, (err, image) => {
      if (err) reject(err)
      if (!image) reject(`${image} is not supported`)
      console.log({ image })
      const dest = `${path}/resize/${file}`
      console.log({ dest })
      image
        .resize(500, Jimp.AUTO)
        .quality(20)
        .write(dest)

      resolve(`${file} done`)
    })
  })
}

function formatting ({ fileList, path } = {}) {
  return new Promise (async (resolve, reject) => {
    for (file of fileList) {
      console.log('formatting', file, path)
      await resize({ path, file })
    }
    console.log('All files done')
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

    console.log({ processed })
  })
}


async function processing ({ fileList, path } = {}) {
  console.log({ fileList })
  try {
    await formatting({ fileList, path })
    await compressing({ path: `${path}/resize` })
    console.log('all done')
  } catch (error) {
    throw error
  }
}


module.exports = processing
