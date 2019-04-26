const fs = require('fs')

const stats = fs.statSync(file)
const bytes = stats.size
const kb = bytes / 1000
