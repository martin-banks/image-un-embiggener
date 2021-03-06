const info = {
  description: 'No cropping, optimises images to different levels with no scaling or cropping.'
}

const crops = [
  {
    context: 'optimised',
    files: {
      jpg: true,
      png: true,
    },
    width: null,
    suffix: '-60',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 60,
    },
    png: {
      quality: 0,
      compressions: 0,
      colors: 256,
    },
  },
  {
    context: 'optimised',
    files: {
      jpg: true,
      png: true,
    },
    width: null,
    suffix: '-40',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 40,
    },
    png: {
      quality: 100,
      compressions: 9,
      colors: 128,
    },
  },
  {
    context: 'optimised',
    files: {
      jpg: true,
      png: true,
    },
    width: null,
    suffix: '-30',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 30,
    },
    png: {
      quality: 100,
      compressions: 0,
      colors: 128,
    },
  },
  {
    context: 'optimised',
    files: {
      jpg: true,
      png: true,
    },
    width: null,
    suffix: '-20',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 20,
    },
    png: {
      quality: 0,
      compressions: 0,
      colors: 64,
    },
  },
  {
    context: 'optimised',
    files: {
      jpg: true,
      png: true,
    },
    width: null,
    suffix: '-10',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 10,
    },
    png: {
      quality: 0,
      compressions: 9,
      colors: 2,
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
