const info = {
  description: 'No cropping, optimises images to different levels with no scaling or cropping.'
}

const crops = [
  {
    context: 'optimised',
    files: {
      jpg: true,
      png: false,
    },
    width: null,
    suffix: '-60',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 60,
    },
  },
  {
    context: 'optimised',
    files: {
      jpg: true,
      png: false,
    },
    width: null,
    suffix: '-40',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 40,
    },
  },
  {
    context: 'optimised',
    files: {
      jpg: true,
      png: false,
    },
    width: null,
    suffix: '-30',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 30,
    },
  },
  {
    context: 'optimised',
    files: {
      jpg: true,
      png: false,
    },
    width: null,
    suffix: '-20',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 20,
    },
  },
  {
    context: 'optimised',
    files: {
      jpg: true,
      png: false,
    },
    width: null,
    suffix: '-10',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 10,
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
