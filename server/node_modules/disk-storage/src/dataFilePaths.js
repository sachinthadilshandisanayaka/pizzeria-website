const path = require('path')

const hourInMs = 60 * 60 * 1000

let dataFolder = 'data'

const getFolder = date => path.join(...[
  dataFolder,
  date.getUTCFullYear().toString(),
  (date.getUTCMonth() + 1).toString().padStart(2, '0'),
  date.getUTCDate().toString().padStart(2, '0')
])

const getFilePath = date => path.join(getFolder(date), date.getUTCHours().toString().padStart(2, '0'))

const getFiles = async (cursor) => {
  let from = cursor.timestamp
  let to = Date.now()
  let interval = (to - from)

  if (interval < 0)
    console.log(`Fatal! From is bigger then to, from: ${from}, to: ${to}, check cursor file.`)

  let intervalInHours = Math.ceil(interval / hourInMs)

  let dataFiles = new Array(intervalInHours).fill(null)
    .map((_, hour) => ({
      position: 0,
      path: getFilePath(new Date(from + hour * hourInMs)),
      timestamp: from + hour * hourInMs
    }))
  dataFiles[0].position = cursor.position

  return dataFiles
}
/**
 * @param {String} dataFolderPath
 */
module.exports = dataFolderPath => {
  dataFolder = dataFolderPath || dataFolder
  return { getFiles, getFilePath, getFolder }
}
