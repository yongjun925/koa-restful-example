const path = require('path')
const fs = require('fs-extra')

const LOADS = {}
module.exports.load = function (directory, rootDir = path.resolve(__dirname, '..')) {
  directory = path.resolve(rootDir, directory)
  if (LOADS[directory]) {
    return LOADS[directory]
  }
  let obj = {}
  if (fs.existsSync(directory)) {
    const files = fs.readdirSync(directory)
    files.forEach(item => {
      if (path.extname(item) === '.js') {
        obj[path.basename(item, '.js')] = require(path.resolve(directory, item))
      }
    })
  }
  LOADS[directory] = obj
  return obj
}
