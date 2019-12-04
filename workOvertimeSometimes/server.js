const express = require('express')

const app = express()

app.use(express.static('./static'));

const runServer = async () => {
  await app.listen(3000)
  console.log('start@http://localhost:3000')
}

module.exports = {runServer}