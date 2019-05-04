const vibrant = require('node-vibrant')

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

function palette (imagePath) {
  return new Promise((resolve, reject) => {
    vibrant
      .from(imagePath)
      .getPalette((err, pal) => {
        console.log({ pal })
        if (err) {
          console.log('\n--------\nERROR GETTING COLOR PALETTE\n-----------\n', err)
          return reject(err)
        }
        const colors = makeRGBInt(pal)
        // low color pictures do not always generate a vibrant color pallette
        // if (!colors.Vibrant) colors.Vibrant = { _rgb: [0, 0, 0] }
        // const colorData = `export const colors = ${JSON.stringify(colors, 'utf-8', 2)}`
        resolve(colors)
      })
  })
}

module.exports = palette
