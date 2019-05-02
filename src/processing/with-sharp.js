require('hazardous')
const sharp = require('sharp')
const path = require('path')
const Promise = require('bluebird')
const { spawn } = require('child_process')

// fileList
// path
// mainWindow
// model

async function processJpeg ({ file, filePath, model, mainWindow }) {
  return new Promise(async (resolve, reject) => {
    await sharp(path.join(filePath, file))
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
          mainWindow.webContents.send('version-complete', { file, dir: `${model.context}${model.suffix}`})
          resolve()
        }
      )
      mainWindow.webContents.send(
        'log', 
        `|> SHARP -> Complete: ${model.context}${model.suffix} | ${file}`
      )
  })
}

async function processPng ({ file, filePath, model, mainWindow }) {
  return new Promise(async (resolve, reject) => {
    try {
      await sharp(path.join(filePath, file))
        .resize(model.width)
        // .png()
        .png({
          compressionLevel: 9,
          quality: 10,
          colors: 64,
          // quality: model.quality.png,
          // compressionLevel: model.compression.png,
          // colors: model.colors.png,
          // dither: model.dither,
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
            mainWindow.webContents.send('version-complete', { file, dir: `${model.context}${model.suffix}`})
            resolve()
          }
        )
        mainWindow.webContents.send(
          'log', 
          `|> SHARP -> Complete: ${model.context}${model.suffix} | ${file}`
        )
    } catch (err) {
      reject(err)
      throw err
    }
  })
}


async function processing ({ fileList, filePath, mainWindow, model } = {}) {
  return new Promise (async (resolve, reject) => {
    for (const file of fileList) {
      mainWindow.webContents.send('log', `|> SHARP -> Starting: ${filePath}/${file}`)
      // const fullImagePath = path.join(filePath, file)
      for (const imageModel of model.crops) {
        if (file.includes('.jpg')) {
          try {
            await processJpeg({ file, filePath, model: imageModel, mainWindow })
          } catch (err) {
            throw err
          }
        } else if (file.includes('.png')) {
          try {
            await processPng({ file, filePath, model: imageModel, mainWindow })
          // mainWindow.webContents.send('log', `|> .png files are not supported. Skipping`)
          } catch (err) {
            throw err
          }
          
        }
      }
      spawn('mv', [path.join(filePath, file), path.join(filePath, '_RAW')])
    }
    mainWindow.webContents.send('log', `|> SHARP -> All files complete`)
    mainWindow.webContents.send('log', `--- All files complete 🤘 ---`)
    mainWindow.webContents.send('status', 'complete')
    mainWindow.webContents.send('complete', true)
    resolve('All files done')
  })
}

module.exports = processing
