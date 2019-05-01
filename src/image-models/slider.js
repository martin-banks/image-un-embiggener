const info = {
  description: 'Crops images suitable for basic stliders and static graphics published through Kurator Editorial Tools'
}

const crops = [
  {
    context: 'mobile/medium',
    files: {
      jpg: true,
      png: false,
    },
    width: 800,
    suffix: '@2x',
    blur: 0,
    dither: 1,
    sharpen: 0,
    quality: {
      jpg: 40,
      png: 40,
      png: 0
    },
    compression: {
      png: 8,
    },
    colors: {
      png: 256,
    },
  },
  {
    context: 'mobile/heavy',
    files: {
      jpg: true,
      png: false,
    },
    width: 800,
    suffix: '@2x',
    blur: 0,
    dither: 1,
    sharpen: 0,
    quality: {
      jpg: 30,
      png: 30,
    },
    compression: {
      png: 6,
    },
    colors: {
      png: 128,
    },
  },
  {
    context: 'mobile/ultra',
    files: {
      jpg: true,
      png: false,
    },
    width: 800,
    suffix: '@2x',
    blur: 0,
    dither: 1,
    sharpen: 0,
    quality: {
      jpg: 10,
      png: 10,
    },
    compression: {
      png: 4,
    },
    colors: {
      png: 64,
    },
  },


  {
    context: 'desktop/medium',
    files: {
      jpg: true,
      png: false,
    },
    width: 1300,
    suffix: '@2x',
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
    context: 'desktop/heavy',
    files: {
      jpg: true,
      png: false,
    },
    width: 1300,
    suffix: '@2x',
    blur: 0,
    dither: 1,
    sharpen: 0,
    quality: {
      jpg: 30,
      png: 30,
    },
    compression: {
      png: 6,
    },
    colors: {
      png: 128,
    },
  },
  {
    context: 'desktop/ultra',
    files: {
      jpg: true,
      png: false,
    },
    width: 1300,
    suffix: '@2x',
    blur: 0,
    dither: 1,
    sharpen: 0,
    quality: {
      jpg: 10,
      png: 10,
    },
    compression: {
      png: 4,
    },
    colors: {
      png: 64,
    },
  },

]

const report = {
  colors: true,
  dimensions: true,
  ratio: true,
}

module.exports = {
  info,
  crops,
  report,
}
