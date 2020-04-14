const fs = require('fs')
const path = require('path')
const util = require('util')
const stream = require('stream')
const R = require('ramda')
const moment = require('moment')
const _id = require('shortid')

const types = require('../client/src/types')
const { Station, Tier } = types

console.log('Tier', Tier)

const readFile = util.promisify(fs.readFile)

const log = (label, depth = null) => value =>
  console.log(
    label,
    util.inspect(value, { showHidden: false, depth, colors: true }),
  )

function drain(writable) {
  if (writable.destroyed) {
    return Promise.reject(new Error('premature close'))
  }
  return Promise.race([
    once(writable, 'drain'),
    once(writable, 'close').then(() =>
      Promise.reject(new Error('premature close')),
    ),
  ])
}

async function pump(iterable, writable) {
  for await (const chunk of iterable) {
    // Handle backpressure on write().
    if (!writable.write(chunk)) {
      await drain(writable)
    }
  }
  writable.end()
}

const finished = util.promisify(stream.finished)

const groupByMultiple = R.curry((fields, data) => {
  if (fields.length === 1) return R.groupBy(fields[0], data)
  let groupBy = R.groupBy(R.last(fields))
  R.times(() => {
    groupBy = R.mapObjIndexed(groupBy)
  }, fields.length - 1)

  return groupBy(groupByMultiple(R.init(fields), data))
})

const parseDate = a => moment(a)
// parseFloat already named like we want
const parseInteger = R.flip(R.curry(parseInt))(10)

const xform = groupingsList => implicitDataset =>
  R.compose(
    groupByMultiple(groupingsList),
    R.tail,
    R.map(
      R.compose(
        R.evolve({
          week: a => moment(a).week(),
          isoTime: a => moment(a).isoWeek(),
          date: a => moment(a).dayOfYear(),
          dateTime: a => moment(new Date(a))._d,
          lastUpdate: a => moment(new Date(a))._d,
          spent: parseFloat,
          duration: parseInteger,
          impressions: parseFloat,
          webVisits: parseFloat,
          sales: parseFloat,
          leads: parseFloat,
          tier: a => Tier[a],
          /*** Implicit Props: ***/
          //dayPartShort: R.identity,
          //dayPart: R.identity,
          //tier: R.identity,
          //program: R.identity,
        }),
        R.omit([...groupingsList]),
        R.assoc('id', _id.generate()),
      ),
    ),
  )(implicitDataset)

module.exports = {
  drain,
  pump,
  readFile,
  finished,
  groupByMultiple,
  xform,
  log,
}
