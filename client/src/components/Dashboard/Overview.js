import React, { useState } from 'react'
import * as d3 from 'd3'
import * as R from 'ramda'

import { Tier } from '../../types'

const merge2 = (left, right) => {
  console.log('left', left)
  console.log('right', right)

  const rating = parseInt(left.tier) + parseInt(right.tier)
  console.log('rating', rating)

  const imp = left.impressions + right.impressions

  console.log('imp', imp)

  return {
    ...right,
    ...left,
    grp: (left.grp ? left.grp : 0) + rating * (imp || 1),
  }
}

const left = {
  week: 44,
  isoTime: 44,
  date: 305,
  dateTime: '2019-11-01T07:09:00.000Z',
  stationId: 'AMC',
  stationName: 'American Movie Classics',
  day: 'Thursday',
  duration: 30,
  program: 'MOVIE',
  dayPart: 'OVERNIGHT',
  spent: 225,
  impressions: 153,
  tier: 2,
  webVisits: 22.6,
  sales: 1.52,
  leads: 1.5,
  lastUpdate: '2020-02-19T18:02:00.000Z',
}

const right = {
  week: 44,
  isoTime: 44,
  date: 303,
  dateTime: '2019-10-30T15:47:00.000Z',
  stationId: 'AMC',
  stationName: 'American Movie Classics',
  day: 'Wednesday',
  duration: 15,
  program: 'MOVIE',
  dayPart: 'DAYTIME',
  spent: 455,
  impressions: 83,
  tier: 2,
  webVisits: 6.46,
  sales: 0.27,
  leads: 0.52,
  lastUpdate: '2020-02-19T18:02:00.000Z',
}

console.log('merge2(left, right)', merge2(left, right))

const snd = R.compose(R.head, R.tail)

const calculateGRPs = slots => {
  console.log('slots', slots)

  const calculateTotals = R.compose(R.reduce(merge2, { tier: 0, impressions: 0 }), R.tap(console.log), R.chain(snd))
  console.log('calculateTotals(slots)', calculateTotals(slots))

  // const aggregate = slots.reduce(
  //   (acc, [station, ads]) => {
  //     const { tier, impressions } = ads[0]

  //     console.log('station', station)
  //     console.log('ads', ads)
  //     console.log('ads.length', ads.length)

  //     // I derived "Rating" here arbitrarily, as I was not provided how this KPI is calculated.
  //     // To keep it simple, here I treat the tier as an Enum, which means the identifier (Tier[tier] resolves to an integer, which functions as a multiplier of the value received for impressions):
  //     const rating = acc.tier + Tier[tier]
  //     const imp = acc.impressions + impressions

  //     const results = {
  //       tier: rating,
  //       impressions: imp,
  //     }
  //     console.log('results', results)

  //     return results
  //   },
  //   { tier: 0, impressions: 0 },
  // )

  // console.log('slots', slots)
  // return aggregate.impressions === 0 ? 0 : aggregate.rating / aggregate.impressions

  // return slots
}

export function Overview({ data }) {
  const [weeks, setWeeks] = useState(['44'])

  const filteredWeeks = weeks.map(week => ({ [week]: data[week] }))
  console.log('weeks', weeks)
  console.log('filteredWeeks', filteredWeeks)
  const flattenWeeks = R.compose(R.toPairs, R.head, R.values, R.head)
  const flatWeeks = flattenWeeks(filteredWeeks)

  const grps = calculateGRPs(flatWeeks)
  console.log('flatWeeks', flatWeeks)

  console.log('grps', grps)

  // const transformed =
  return <div>Overview</div>
}
