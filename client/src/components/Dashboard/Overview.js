import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import * as R from 'ramda'

import { GRPsChart } from './GRPsChart'
import { Tier } from '../../types'
import { useGRPs } from '../../hooks'

export function Overview({ data }) {
  const grps = useGRPs(['44', '52'], data)
  return <GRPsChart grps={grps}>Overview</GRPsChart>
}
