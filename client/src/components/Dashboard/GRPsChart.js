import React from 'react'
import * as R from 'ramda'
import * as d3 from 'd3'

import { Station } from '../../types'

const keys = R.uniq(R.keys(Station))

const scale = d3
  .scaleOrdinal(keys)
  .domain(keys)
  .range([0, 1000])

const axis = d3.axisBottom(scale).tickFormat(d => 'hai')

d3.select('svg')
  .append('g')
  .attr('transform', 'translate(10,30)')
  .call(axis)

export const GRPsChart = ({ grps }) => {
  React.useEffect(() => {
    console.log('scale', scale)
    d3.select('svg')
  })

  return <div>GRPs</div>
}
