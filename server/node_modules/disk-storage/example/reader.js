const storage = require('../')

let app = async () => {
  let timer = +new Date()
  let reader = await storage.reader()
  console.log(`${(new Date() - timer)}ms`)
  reader.on(data => {
    console.log('RECEIVE', data)
  })
}

app()
