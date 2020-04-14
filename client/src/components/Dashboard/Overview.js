import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import * as R from 'ramda'

import { GRPsChart } from './GRPsChart'
import { SimpleChart } from './SimpleChart'

import { Tier } from '../../types'
import { useGRPs } from '../../hooks'

export function Overview({ data }) {
  const grps = useGRPs(['44', '52'], data)
  return (
    <div>
      <SimpleChart width={800} height={600} margin={0} />
    </div>
  )
}
