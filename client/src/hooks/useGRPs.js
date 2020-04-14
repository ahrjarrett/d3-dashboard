import { useEffect, useState } from 'react'
import * as R from 'ramda'

import { spreadListIntoMap } from '../utils'

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

const makeId = () => { }

const fst = R.head
const snd = R.compose(R.head, R.tail)

const grpInitialState = { tier: 0, impressions: 0, grp: 0 }

const reduceGRPs = R.compose(R.prop('grp'), R.reduce(merge2, grpInitialState))

const calculateTotals = R.compose(reduceGRPs, R.chain(snd))
const calculateStationTotals = R.map(reduceGRPs)

//const calculateStationTotals = R.map(R.converge(R.objOf, [fst, R.compose(reduceGRPs, snd)]))

const calculateGRPs = slots => ({
  total: calculateTotals(slots),
  byStation: R.indexBy(R.prop('id')(calculateStationTotals(slots))),
})

export function useGRPs(wks, data) {
  const [weeks] = useState(wks)
  const filteredWeeks = weeks.map(week => ({ [week]: data[week] }))

  const flattenWeeks = spreadListIntoMap
  const flatWeeks = flattenWeeks(filteredWeeks)

  const calculateGRPs = slots => {
    const stationTotals = calculateStationTotals(slots)
    return {
      total: calculateTotals(slots),
      byStation: stationTotals,
    }
  }

  return calculateGRPs(flatWeeks)
}
