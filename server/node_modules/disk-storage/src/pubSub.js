const notifySubscibers = subscribers => async data => {
  for (let subscriber of subscribers) {
    try {
      await subscriber(data)
    } catch (e) {
      console.log(`Warning! Subscriber failed to process data.`)
    }
  }
}

const createPubSub = () => {
  let subscribers = []
  return {
    send: notifySubscibers(subscribers),
    on: subscriber => subscribers.push(subscriber)
  }
}

module.exports = createPubSub
