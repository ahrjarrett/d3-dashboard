import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as R from 'ramda'
import * as d3 from 'd3'
import * as S from './styled'

import { STATICDIR, SERVER_URL } from '../../config'

import { Station } from '../../types'
import { useFetch, useGRPs } from '../../hooks'
import { getDateFromWeekNumber, spreadListIntoMap } from '../../utils'

const keys = R.keys(Station)

// Margins, width and height.
const margin = { top: 0, right: 0, bottom: 0, left: 0 }
const width = 800 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom
const barWidth = width / keys.length

const OVERVIEW_GRAPH = 'OVERVIEW_GRAPH'

const stationsData = R.values(Station)

function useOverviewGraph(interval, grps) {
  const bodyRef = useRef(d3.select('body'))
  const overviewDataSelector = state => state.fetch.OVERVIEW.data
  const data = useSelector(overviewDataSelector)

  useLayoutEffect(() => {
    if (!bodyRef.current) bodyRef.current = d3.select('body')
  }, [bodyRef])

  const keys = R.compose(
    R.sort((b, a) => (b < a ? 1 : -1)),
    R.keys,
  )(data)

  d3.select('body')
    .append('svg')
    .attr('width', 50)
    .attr('height', 50)
    .append('circle')
    .attr('cx', 25)
    .attr('cy', 25)
    .attr('r', 25)
    .style('fill', 'purple')

  const weeks = keys.slice(0, interval)

  const overviewData = R.compose(
    R.compose(R.map(R.tail), R.values, R.toPairs),
    R.map(R.chain(R.pick(['impressions', 'program', 'tier', 'week']))),
    R.zipObj(weeks),
    R.map(week => data[week]),
  )(weeks)

  return { data: overviewData, weeks, ref: bodyRef }
}

export const GRPsChart = ({ grps }) => {
  const { stationId, interval } = useParams()
  const data = useOverviewGraph(interval || 4, grps)

  return (
    <S.PageContainer>
      <S.ChartTitle>GRPs Overview: {Station[stationId]}</S.ChartTitle>
      <S.Graphic>
        <S.GRPsChartWrapper id={OVERVIEW_GRAPH}></S.GRPsChartWrapper>
      </S.Graphic>
    </S.PageContainer>
  )
}
