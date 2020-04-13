import React, { useState } from 'react'
import * as d3 from 'd3'
import * as R from 'ramda'

import { Tier } from '../../types'

const calculateGRPs = slots => {
  const aggregate = slots.reduce(
    (acc, { tier, impressions }) => {
      // "Rating" derived arbitrarily, as I was not provided this information.
      // To keep it simple, here I treat the tier as an Enum, which means the identifier (Tier[tier] resolves to an integer, which functions as a multiplier of the value received for impressions):
      const rating = acc.tier + Tier[tier]
      const imp = acc.impressions + impressions

      const results = {
        tier: rating,
        impressions: imp,
      }
      console.log('results', results)

      return results
    },
    { tier: 0, impressions: 0 },
  )
  return aggregate.impressions === 0 ? 0 : aggregate.rating / aggregate.impressions
}

export function Overview({ data }) {
  const [weeks, setWeeks] = useState(['2019-10-28'])

  const filteredWeeks = weeks.map(week => ({ [week]: data[week] }))
  console.log('weeks', weeks)
  console.log('filteredWeeks', filteredWeeks)
  const flattenWeeks = R.compose(R.values, R.head)

  const grps = calculateGRPs(flattenWeeks(filteredWeeks))
  console.log('grps', grps)

  // const transformed =
  return <div>Overview</div>
}
