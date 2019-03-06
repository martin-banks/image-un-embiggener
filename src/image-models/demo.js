const info = {
  description: 'Crops images suitable for basic stliders and static graphics published through Kurator Editorial Tools'
}
const crops = [
  // {
  //   context: 'mobile',
  //   files: {
  //     jpg: true,
  //     png: true,
  //   },
  //   width: 320,
  //   suffix: '@1x',
  //   blur: 0,
  //   dither: 100,
  //   sharpen: 0,
  //   quality: {
  //     jpg: 30,
  //   },
  // },
  {
    context: 'mobile',
    files: {
      jpg: true,
      png: true,
    },
    width: 640,
    suffix: '@2x',
    blur: 0,
    dither: 100,
    sharpen: 0,
    quality: {
      jpg: 30,
    },
  },

  // {
  //   context: 'desktop',
  //   files: {
  //     jpg: true,
  //     png: true,
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
  // {
  //   context: 'desktop',
  //   files: {
  //     jpg: true,
  //     png: true,
  //   },
  //   width: 1300,
  //   suffix: '@2x',
  //   blur: 0,
  //   dither: 100,
  //   sharpen: 0,
  //   quality: {
  //     jpg: 30,
  //   },
  // },

  // {
  //   context: 'thumb',
  //   files: {
  //     jpg: true,
  //     png: true,
  //   },
  //   width: 20,
  //   suffix: '@blur',
  //   dither: 100,
  //   blur: 3,
  //   dither: 100,
  //   sharpen: 0,
  //   quality: {
  //     jpg: 20,
  //   },
  // },

  // {
  //   context: 'thumb',
  //   files: {
  //     jpg: true,
  //     png: true,
  //   },
  //   width: 50,
  //   suffix: '@50',
  //   blur: 0,
  //   dither: 100,
  //   sharpen: 0,
  //   quality: {
  //     jpg: 50,
  //   },
  // },
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
