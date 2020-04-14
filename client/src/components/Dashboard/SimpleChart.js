import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as d3 from 'd3'
import * as R from 'ramda'

import { Station } from '../../types'

import { getDateFromWeekNumber, spreadListIntoMap } from '../../utils'

export function SimpleChart({ width, height, margin }) {
  const svg = d3.create('svg').attr('viewBox', [0, 0, width, height])
  const overviewSelector = state => Object.keys(state.fetch.OVERVIEW.data).map(w => state.fetch.OVERVIEW.data[w])
  const d = useSelector(overviewSelector)

  if (!d) return null

  const getWeeks = R.map(R.compose(R.prop('week'), R.head))
  const getImpressions = R.map(R.compose(R.reduce(R.add, 0), R.pluck('impressions')))
  const data = R.zip(getWeeks(d), getImpressions(d))

  // format: Tuple<WeekNumber, Aggregate Impressions that Week>
  return <div>simple chart</div>
}

const defaultMargin = { top: 0, bottom: 0, left: 0, right: 0 }
const defaultWidth = 800
const defaultHeight = 600

SimpleChart.defaultProps = {
  margin: defaultMargin,
  width: defaultWidth,
  height: defaultHeight,
}
