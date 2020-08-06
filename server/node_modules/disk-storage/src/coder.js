const EOL = require('os').EOL

module.exports = {
  encode: data => {
    let text = ''
    for (let x of data) {
      for (let [ key, value ] of Object.entries(x)) {
        if (value == null) continue
        text += key.replace(/\n/g, ' ') + ':' + value.toString().replace(/[\n|]/g, ' ') + '|'
      }

      text += EOL
    }
    return text
  },
  decode: text => {
    let data = {}

    for (let splitted of text.split('|')) {
      let [ key, value ] = splitted.split(':')

      if (key.trim().length > 0)
        data[key] = value
    }

    return data
  }
}
