const fs = require('fs')
const path = require('path')
const parse = require('csv-parse')
const R = require('ramda')

const utils = require('./utils')

const dataDir = path.resolve(__dirname, 'data')
const inputFilePath = path.resolve(dataDir, 'mock_data.csv')
const outputFilePath = path.resolve(dataDir, 'data.json')
const stationMapPath = path.resolve(dataDir, 'stationMap.json')

const columns = [
  'week',
  'isoTime',
  'date',
  'time',
  'dateTime',
  'stationId',
  'stationName',
  'day',
  'duration',
  'program',
  'dayPartShort',
  'dayPart',
  'spent',
  'impressions',
  'tier',
  'webVisits',
  'sales',
  'leads',
  'lastUpdate',
]

const spreadListIntoMap = R.reduce(R.merge, {})

const parser = parse({ columns, relax_column_count: true })
const readable = fs.createReadStream(inputFilePath, { encoding: 'utf8' })

const groupings = [R.prop('stationId'), R.prop('week')]

module.exports = async function transform(dataKey) {
  let results = []

  readable
    .pipe(parser)
    .on('data', data => results.push(data))
    .on('end', () => {
      const output = utils.xform(groupings)(
        // Remove header row
        R.tail(results),
      )

      console.log('output', output)

      const stations = new Set(Object.keys(output))

      // Get unique stations
      const stationMap = R.compose(
        spreadListIntoMap,
        R.map(value => ({ [value]: value })),
      )([...stations])

      stations.forEach(station => {
        console.log(`writing ${station}.json`)
        fs.writeFileSync(
          `./data/station/${station}.json`,
          JSON.stringify(output[station]),
        )
      })

      fs.writeFileSync(outputFilePath, JSON.stringify(output))
      fs.writeFileSync(stationMapPath, JSON.stringify(stationMap))
    })
}
