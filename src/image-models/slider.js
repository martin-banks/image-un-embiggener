const info = {
  description: 'Crops images suitable for basic stliders and static graphics published through Kurator Editorial Tools'
}

const crops = [
  // {
  //   context: 'mobile',
  //   files: {
  //     jpg: true,
  //     png: false,
  //   },
  //   width: 400,
  //   suffix: '@1x',
  //   blur: 0,
  //   dither: 100,
  //   sharpen: 0,
  //   quality: {
  //     jpg: 40,
  //   },
  // },
  {
    context: 'mobile/medium',
    files: {
      jpg: true,
      png: false,
    },
    width: 800,
    suffix: '@2x',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 40,
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
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 30,
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
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 10,
    },
  },

  // {
  //   context: 'desktop',
  //   files: {
  //     jpg: true,
  //     png: false,
  //   },
  //   width: 650,
  //   suffix: '@1x',
  //   blur: 0,
  //   dither: 100,
  //   sharpen: 0,
  //   quality: {
  //     jpg: 30,
  //   },
  // },
  {
    context: 'desktop/medium',
    files: {
      jpg: true,
      png: false,
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
  {
    context: 'desktop/heavy',
    files: {
      jpg: true,
      png: false,
    },
    width: 1300,
    suffix: '@2x',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 30,
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
