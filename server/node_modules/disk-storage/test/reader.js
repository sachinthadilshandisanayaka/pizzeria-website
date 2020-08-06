const storage = require('../')

const delay = require('delay')

let app = async () => {
  let data = new Array(1000).fill(() => ({ msg: 'hello' })).map(x => x())

  await storage.writer(data)
  await storage.writer(data)
  await storage.writer(data)

  let reader = await storage.reader()
  reader.on(async data => {
    await delay(1000)
    console.log('READED', data.length)
    for (let x of data) {
      if (x.msg !== 'hello')
        console.log('ERROR', x)
    }
  })
}

app().catch(e => console.log(e.stack))
