const fs = require('fs')
const EOL = require('os').EOL
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)
const writeFile = Promise.promisify(fs.writeFile)
const open = Promise.promisify(fs.open)
const close = Promise.promisify(fs.close)
const isNotAccessible = Promise.promisify((path, cb) => fs.access(path, fs.constants.R_OK | fs.constants.W_OK, (err) => cb(null, err)))

let cursorPath = 'cursor'
let fromDate = Date.UTC(2017, 0)

const parse = text => {
  let [ timestampText, positionText ] = text.split(':')

  let timestamp = parseInt(timestampText, 10)
  let position = parseInt(positionText, 10)

  if (isNaN(timestamp) || isNaN(position)) {
    console.log(`Warning! Cursor entry is not valid, timestamp: ${timestampText}, position: ${positionText}, will be used default options, from: ${fromDate}.`)
    return { timestamp: +fromDate, position: 0 }
  } else
    return { timestamp, position }
}

const save = async ({ timestamp, position }) => {
  let text = `${timestamp}:${position}`
  await writeFile(cursorPath, text)
}

const getOrCreate = async () => {
  let cursorNotAccessible = await isNotAccessible(cursorPath)

  if (cursorNotAccessible && cursorNotAccessible.code === 'ENOENT') {
    console.log(`Warning! Cursor file ${cursorPath} is not exist, it will be created.`)
    await close(await open(cursorPath, 'w'))
  } else if (cursorNotAccessible) {
    console.log(`Fatal! Cursor file error ${cursorPath}${EOL}.`, cursorNotAccessible)
    return cursorNotAccessible
  }

  let cursor = parse((await readFile(cursorPath)).toString('utf8'))
  await save(cursor)

  return cursor
}

/**
 * @param {String} path
 * @param {Date} from
 */
module.exports = (path, from) => {
  cursorPath = path || cursorPath
  fromDate = from || Date.UTC(2017, 0)

  return { getOrCreate, save }
}
