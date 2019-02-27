// const fs = require('fs')
// const path = require('path')
const mkdirp = require('mkdirp')

function createDirectoies ({ model, folder }) {
  return new Promise ((resolve, reject) => {
    const raw = `${folder}/_RAW`
    mkdirp.sync(raw, err => {
      if (err) {
        reject(err)
      }
      console.log(`Raw directory created\n${raw}\n--------\n`)
    })
    
    for (const crop of model.crops) {
      const contextDir = `${folder}/${crop.context}${crop.suffix}/optim`
      mkdirp.sync(contextDir, err => {
        if (err) {
          reject(err)
        }
        console.log(`Content directory created\n${contextDir}\n--------\n`)
      })
    }

    resolve()
  })
}

module.exports = createDirectoies
