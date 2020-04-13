import React, { useState } from 'react'
import * as d3 from 'd3'
import * as R from 'ramda'

import { Tier } from '../../types'

const merge2 = (left, right) => {
  const tier = parseInt(right.tier)
  const { impressions } = right
  const grp = left.grp + tier * impressions

  return {
    tier: R.always(left.tier),
    impressions,
    grp,
  }
}

const fst = R.head
const snd = R.compose(R.head, R.tail)

const reduceGRPs = R.compose(R.prop('grp'), R.reduce(merge2, { tier: 0, impressions: 0, grp: 0 }))
const mapIndexed = R.addIndex(R.map)

const calculateTotals = R.compose(reduceGRPs, R.chain(snd))
const calculateStationTotals = R.map(R.converge(R.objOf, [fst, R.compose(reduceGRPs, snd)]))

const calculateGRPs = slots => {
  console.log('slots', slots)

  console.log('calculateTotals(slots)', calculateTotals(slots))
  console.log('calculateStationTotals', calculateStationTotals(slots))

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
