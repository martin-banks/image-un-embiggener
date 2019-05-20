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

const imageWidths = [
  768,
  960,
  1024,
  1280,
  1440,
  1920,
  2048,
]

const crops = imageWidths.reduce((output, w) => {
  const update = output
  template(w).forEach(x => update.push(x))
  return update
}, [])

const report = {
  colors: true,
  dimensions: true,
  ratio: true,
}

module.exports = {
  info,
  crops,
  report,
  imageWidths,
}
