const fs = require('fs')
const path = require('path')
const R = require('ramda')
const cors = require('cors')
const csv = require('csv')
const express = require('express')
const app = express()
const compression = require('compression')

const utils = require('./utils')

const PORT = 1337
const dataDir = path.resolve(__dirname, 'data')

const data = fs.readFileSync(path.resolve(dataDir, 'mock_data.SAMPLE.csv'))
const jsonData = fs.readFileSync(path.resolve(dataDir, 'data.json'))

app.use(cors())
app.use(compression())
app.use('/static', express.static(dataDir))

// TODO: Make this route work by streaming json data to client
// https://nodejs.org/api/stream.html#stream_piping_to_writable_streams_from_async_iterators
// use drain & pump functions from utils:
// utils.drain(...), utils.pump(...)
app.get('/grps', (req, res) => {
  console.log('in grps', jsonData)
  res.json(jsonData)
})

app.listen(PORT, () => console.log(`your server is listening on port ${PORT}`))
