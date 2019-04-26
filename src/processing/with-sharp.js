require('hazardous')
const sharp = require('sharp')
const path = require('path')
const Promise = require('bluebird')
const { spawn } = require('child_process')

// fileList
// path
// mainWindow
// model

async function processImage ({ file, filePath, model, mainWindow }) {
  return new Promise(async (resolve, reject) => {
    const data = await sharp(path.join(filePath, file))
      .resize(model.width)
      .jpeg({
        quality: model.quality.jpg,
        chromaSubsampling: '4:4:4',
      })
      .toFile(
        path.join(filePath, `${model.context}${model.suffix}/${file}`),
        err => {
          if (err) {
            mainWindow.webContents.send('log', `|> ERROR: ${err}`)
            reject(err)
            throw err
          }
          mainWindow.webContents.send('log', `|> DONE: ${file}`)
          resolve()
        }
      )
      mainWindow.webContents.send(
        'log', 
        `|> SHARP -> Complete: ${model.context}${model.suffix} | ${file} | ${data}`
      )
  })
}


async function processing ({ fileList, filePath, mainWindow, model } = {}) {
  return new Promise (async (resolve, reject) => {
    for (const file of fileList) {
      mainWindow.webContents.send('log', `|> SHARP -> Starting: ${filePath}/${file}`)
      // const fullImagePath = path.join(filePath, file)
      for (const imageModel of model.crops) {
        try {
          await processImage({ file, filePath, model: imageModel, mainWindow })
        } catch (err) {
          throw err
        }
      }
      // spawn('mv', [path.join(filePath, file), path.join(filePath, '_RAW')])
    }
    mainWindow.webContents.send('log', `|> SHARP -> All files complete`)
    resolve('All files done')
  })
}

module.exports = processing
