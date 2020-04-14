const fs = require('fs')
const path = require('path')
const Stream = require('stream')
const d3 = require('d3')
const moment = require('moment')
const gzip = require('zlib').createGzip()
const once = require('events').once

const R = require('ramda')
const streamTransform = require('stream-transform')
const brotli = require('brotli')
const stringify = require('csv').stringify
const parse = require('csv-parse')

const utils = require('./utils')
const types = require('../client/src/types')
const { Station, Tier } = types
import { useFetch } from '../../hooks'

const brotliSettings = {
  extension: 'br',
  skipLarger: true,
  mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
  quality: 10,
  lgwin: 12,
}

const dataDir = path.resolve(__dirname, 'data')
const inputFilePath = path.resolve(__dirname, 'data', 'mock_data.csv')
const outputFilePath = path.resolve(__dirname, 'data', 'data.json')
const stationMapPath = path.resolve(__dirname, 'data', 'stationMap.json')

const readable = fs.createReadStream(inputFilePath, { encoding: 'utf8' })
const writeable = fs.createWriteStream(outputFilePath)
//const writeable = fs.createWriteStream(`${outputFilePath}.csv.gz`)

const parser = parse({ columns, relax_column_count: true })
const stringifier = stringify({ header: true, columns, from: 1 })

async function compress() {
  const makeGzip = () => {
    // creates gzip file in case browser doesn't support .br files:
    readable.pipe(gzip).pipe(writeable)
    writeable.on('finish', () => {
      writeable.end()
    })
  }

  // create some brotli:
  const makeCompressedFiles = () => {
    const csvFileSync = fs.readFileSync(inputFilePath)
    makeGzip()
    const compressed = brotli.compress(csvFileSync, brotliSettings)
    fs.writeFileSync(`${outputFilePath}.br`, compressed)
    console.log(
      `brotli file written: \n${outputFilePath}.bz`,
      outputFilePath + '.br',
    )
  }

  await makeCompressedFiles()
}
