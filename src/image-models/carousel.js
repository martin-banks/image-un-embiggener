const crops = [
  {
    context: 'mobile',
    files: {
      jpg: true,
      png: true,
    },
    width: 320,
    suffix: '@1x',
    blur: 0,
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
    width: 640,
    suffix: '@2x',
    blur: 0,
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
    sharpen: 0,
    quality: {
      jpg: 40,
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
    sharpen: 0,
    quality: {
      jpg: 30,
    },
  },

  {
    context: 'thumb',
    files: {
      jpg: true,
      png: true,
    },
    width: 20,
    suffix: '@blur',
    blur: 3,
    sharpen: 0,
    quality: {
      jpg: 20,
    },
  },

  {
    context: 'thumb',
    files: {
      jpg: true,
      png: true,
    },
    width: 50,
    suffix: '@50',
    blur: 0,
    sharpen: 0,
    quality: {
      jpg: 50,
    },
  },
]

const report = {
  colors: true,
  dimensions: true,
  ratio: true,
}

export default {
  crops,
  report,
}
