const info = {
  description: 'Crops images suitable for basic stliders and static graphics published through Kurator Editorial Tools'
}

const crops = [
  {
    context: 'mobile',
    files: {
      jpg: true,
      png: true,
    },
    width: 400,
    suffix: '@1x',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 40,
    },
  },
  {
    context: 'mobile',
    files: {
      jpg: true,
      png: true,
    },
    width: 800,
    suffix: '@2x',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 30,
    },
  },

  {
    context: 'desktop',
    files: {
      jpg: true,
      png: true,
    },
    width: 650,
    suffix: '@1x',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 30,
    },
  },
  {
    context: 'desktop',
    files: {
      jpg: true,
      png: true,
    },
    width: 1300,
    suffix: '@2x',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 40,
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
