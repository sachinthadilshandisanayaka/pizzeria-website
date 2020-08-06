const storage = require('../')

let data = [
  { time: +new Date(), val: 1 },
  { time: +new Date(), val: 35 },
  { time: +new Date(), val: 32 },
  { time: +new Date(), val: 4 },
  { time: +new Date(), val: 2 },
  { time: +new Date(), val: 5 },
  { time: +new Date(), val: 35 },
  { time: +new Date(), val: 32 },
  { time: +new Date(), val: 4 },
  { time: +new Date(), val: 2 },
  { time: +new Date(), val: 5 },
  { time: +new Date(), val: 35 },
  { time: +new Date(), val: 32 },
  { time: +new Date(), val: 4 },
  { time: +new Date(), val: 2 },
  { time: +new Date(), val: 32 },
  { time: +new Date(), val: 4 },
  { time: +new Date(), val: 2 },
  { time: +new Date(), val: 5 },
  { time: +new Date(), val: 35 },
  { time: +new Date(), val: 32 },
  { time: +new Date(), val: 4 },
  { time: +new Date(), val: 2 },
  { time: +new Date(), val: 32 },
  { time: +new Date(), val: 4 },
  { time: +new Date(), val: 2 },
  { time: +new Date(), val: 5 },
  { time: +new Date(), val: 5 },
  { time: +new Date(), val: 35 },
  { time: +new Date(), val: 32 },
  { time: +new Date(), val: 4 },
  { time: +new Date(), val: 2 },
  { time: +new Date(), val: 5 },
  { time: +new Date(), val: 7 }
]

let app = async () => {
  let timer = +new Date()
  await storage.writer(data)
  console.log(`${(new Date() - timer)}ms`)
}

app()
