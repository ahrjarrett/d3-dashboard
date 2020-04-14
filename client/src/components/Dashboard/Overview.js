import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import * as R from 'ramda'

import { GRPsChart } from './GRPsChart'
import { SimpleChart } from './SimpleChart'

import { Tier } from '../../types'
import { useGRPs } from '../../hooks'

const margin = { top: 0, bottom: 0, left: 0, right: 0 }

export function Overview({ data }) {
  const grps = useGRPs(['44', '52'], data)
  return (
    <div>
      <GRPsChart grps={grps}>Overview</GRPsChart>
      <SimpleChart width={800} height={600} margin={margin} />
    </div>
  )
}
