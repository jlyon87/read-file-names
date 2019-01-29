const fs = require('fs')
const path = require('path')

const readDir = folder => {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, items) => {
      if (err) reject(err)

      resolve(items)
    })
  })
}

const writeToJson = (filePath, data) => {
  return new Promise((resolve, reject) => {
    try {
      const writer = fs.createWriteStream(filePath)
      writer.write(JSON.stringify(data, null, 2))
      writer.end()
      resolve(filePath)
    } catch (e) {
      reject(e)
    }
  })

}

console.log(path.join(__dirname, '..', 'output'))

const pathNodes = [
  'C:',
  'Users',
  'justin.lyon',
  'Documents',
  'workspace',
  'ant-jobs',
  'sabre',
  'sabre-prod',
  'src',
  'layouts'
]
const myFolder = path.join(...pathNodes)
const outputFileName = 'layouts.json'
const output = path.join(__dirname, '..', 'output', outputFileName)
readDir(myFolder)
  .then(items => {
    return writeToJson(output, items)
  })
  .catch(err => {
    console.error('Error in main: ' + err.message, err.stack)
  })

