const vibrant = require('node-vibrant')


function palette () {
  return new Promise((resolve, reject) => {
    vibrant
      .from(imagePath)
      .getPalette((err, pal) => {
        if (err) return reject(err)
        const colors = makeRGBInt(pal)
        // low color pictures do not always generate a vibrant color pallette
        // if (!colors.Vibrant) colors.Vibrant = { _rgb: [0, 0, 0] }
        // const colorData = `export const colors = ${JSON.stringify(colors, 'utf-8', 2)}`
        resolve(colors)
      })
  })
}

module.exports = palette
