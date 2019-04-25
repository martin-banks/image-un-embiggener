require('hazardous')
const sharp = require('sharp')
const path = require('path')
const Promise = require('bluebird')

// fileList
// path
// mainWindow
// model

async function processing ({ fileList, filePath, mainWindow, model } = {}) {
  return new Promise (async (resolve, reject) => {
    for (const file of fileList) {
      console.log('starting sharp for', file)
      console.log('will output to', path.join(filePath, 'output.jpg'))
      // sharp(`${filePath}/${file}`)
      await sharp(path.join(filePath, file))
        .resize(1300)
        .jpeg({
          quality: 10,
          chromaSubsampling: '4:4:4',
        })
        .toFile(
          path.join(filePath, 'output.jpg'),
          err => {
            if (err) {
              mainWindow.webContents.send('log', `ERROR: ${err}`)
              reject(err)
              throw err
            }
            mainWindow.webContents.send('log', `Complete: ${path}/${file}`)
          }
        )
    }
    resolve('All files done')
  })
}

module.exports = processing
