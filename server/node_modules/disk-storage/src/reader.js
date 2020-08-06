const fs = require('fs')
const EOL = require('os').EOL
const Promise = require('bluebird')

const read = Promise.promisify(fs.read)

let bufferSize = 128 * 1024
let parallelism = 1
let lineBatchSize = 1000

const readFilePart = f => async (data, position = 0) => {
  data.readBytes = await read(f, data.buffer, 0, bufferSize, position)
}

const processFile = (file, position = 0) => {
  let readPart = readFilePart(file)
  let data = new Array(parallelism).fill(null)
    .map(() => ({
      readBytes: null,
      buffer: Buffer.allocUnsafe(bufferSize)
    }))
  let parallel = new Array(parallelism).fill(null)
    .map((_, i) => {
      let from = position + bufferSize * i
      let buffer = data[i]
      return offset => readPart(buffer, from + offset)
    })

  let i = 0
  let readBytes = position
  let hasNextBytes = true
  const step = bufferSize * parallelism

  return async (handler) => {
    while (hasNextBytes) {
      await Promise.all(parallel.map(x => x(i * step)))

      hasNextBytes = data[data.length - 1].readBytes === bufferSize
      readBytes += hasNextBytes ? step : data.reduce((r, x) => r + x.readBytes, 0)

      let chunk = data.map(x => x.buffer.toString('utf8', 0, Math.max(0, x.readBytes))).join('')

      await handler(chunk, readBytes)

      i++
    }

    return readBytes
  }
}

let fileLines = (file, position = 0) => {
  let processChunk = processFile(file, position)
  let lastLine = ''

  return async (handler) => {
    let readBytes = await processChunk(async (chunk, readBytes) => {
      let lines = chunk.split(EOL)

      lines[0] = lastLine + lines[0]

      lastLine = lines[lines.length - 1]
      lines.pop()

      let sentBytes = 0
      const bytesFrom = readBytes - chunk.length

      for (let line of lines) {
        if (line.length === 0) continue
        sentBytes += line.length
        await handler(line, bytesFrom + sentBytes)
      }
    })

    if (lastLine.length > 0)
      await handler(lastLine, readBytes)

    return readBytes
  }
}

const fileBatchLines = (file, position = 0) => {
  let readLines = fileLines(file, position)
  let lines = []

  return async (handler) => {
    let readBytes = await readLines(async (line, readBytes) => {
      lines.push(line)
      if (lines.length === lineBatchSize) {
        await handler(lines, readBytes)
        lines = []
      }
    })

    if (lines.length > 0)
      await handler(lines, readBytes)

    return readBytes
  }
}

/**
 * @param {Object} opts
 * @param {Number} opts.bufferSize
 * @param {Number} opts.parallelism
 * @param {Number} opts.lineBatchSize
 */
module.exports = (opts = {}) => {
  bufferSize = opts.bufferSize || bufferSize
  parallelism = opts.parallelism || parallelism
  lineBatchSize = opts.lineBatchSize || lineBatchSize

  return { file: processFile, fileLines, fileBatchLines }
}
