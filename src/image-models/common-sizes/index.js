const info = {
  description: 'Common screen widths'
}

const template = width => [
  {
    context: `medium/${width}`,
    width,
    suffix: '',
    blur: 0,
    dither: 1,
    sharpen: 0,
    quality: {
      jpg: 40,
      png: 40,
    },
    compression: {
      png: 8,
    },
    colors: {
      png: 256,
    },
  },
  {
    context: `heavy/${width}`,
    width,
    suffix: '',
    blur: 0,
    dither: 1,
    sharpen: 0,
    quality: {
      jpg: 30,
      png: 30,
    },
    compression: {
      png: 8,
    },
    colors: {
      png: 256,
    },
  },
  {
    context: `ultra/${width}`,
    width,
    suffix: '',
    blur: 0,
    dither: 1,
    sharpen: 0,
    quality: {
      jpg: 10,
      png: 10,
    },
    compression: {
      png: 8,
    },
    colors: {
      png: 256,
    },
  },
]

const crops = [
  ... template(768),
  ... template(960),
  ... template(1024),
  ... template(1280),
  ... template(1440),
  ... template(1920),
  ... template(2048),
]
console.log({ crops })

const report = {
  colors: true,
  dimensions: true,
  ratio: true,
}

// module.exports = {
//   info,
//   crops,
//   report,
// }
