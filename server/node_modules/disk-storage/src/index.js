const fs = require('fs')
const path = require('path')
const EOL = require('os').EOL
const Promise = require('bluebird')

const reader = require('./reader')
const coder = require('./coder')
const initCursor = require('./cursor')
const createPubSub = require('./pubSub')
const dataFilePaths = require('./dataFilePaths')

const open = Promise.promisify(fs.open)
const close = Promise.promisify(fs.close)
const mkdirp = Promise.promisify(require('mkdirp'))
const appendFile = Promise.promisify(fs.appendFile)

const defaultDataFolder = path.join(__dirname, '..', 'data')
const dataFolder = process.env.DATA_FOLDER || (() => { console.log(`Warning! Env variable 'DATA_FOLDER' is not defined, ${defaultDataFolder} is using as data folder.`); return defaultDataFolder })()
const cursorFilename = 'cursor'
const cursorPath = path.join(dataFolder, cursorFilename)
const fromDate = Date.UTC(2017, 0)
const readerOptions = {
  readBufferSize: 128 * 1024,
  readParallelism: 2,
  lineBatchSize: 1000
}
const logAboutMissingDataLog = false

const readNewData = pubSub => async () => {
  await mkdirp(dataFolder)
  let cursor = initCursor(cursorPath, fromDate)
  let data = dataFilePaths(dataFolder)
  let read = reader(readerOptions)

  for (let { position, path, timestamp } of await data.getFiles(await cursor.getOrCreate())) {
    try {
      let file = await open(path, 'r')
      try {
        let readLines = read.fileBatchLines(file, position)
        let processBatch = async (lines, readBytes) => {
          await pubSub.send(lines.map(coder.decode))
          await cursor.save({ position: readBytes, timestamp })
        }
        await readLines(processBatch)
      } catch (e) {
        console.log(`Warning! Failed to read data ${path}:${position}${EOL}${e.stack}.`)
      } finally {
        await close(file)
      }
    } catch (e) {
      if (logAboutMissingDataLog)
        console.log(`Warning! File ${path} is not accessible for reading.`)
    }
  }
}

module.exports = {
  reader: () => {
    let pubSub = createPubSub()
    let reader = readNewData(pubSub)

    setTimeout(async function ReadAndRead (params) {
      await reader()
      setTimeout(ReadAndRead, 5000)
    }, 5000)

    return pubSub
  },
  /**
   * @param {Object[]} data
   */
  writer: async (data) => {
    if (data.length === 0) return
    let now = new Date()
    let dataPaths = dataFilePaths(dataFolder)
    let dataPath = dataPaths.getFolder(now)

    await mkdirp(dataPath)

    await appendFile(dataPaths.getFilePath(now), coder.encode(data))
  }
}
