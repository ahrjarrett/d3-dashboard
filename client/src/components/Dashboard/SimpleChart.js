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

  // format: Tuple<WeekNumber, Aggregate Impressions that Week>
  const data = R.zip(getWeeks(d), getImpressions(d))

  const x = d3
    .scaleBand()
    .domain(data.map(d => d[0]))
    .range([margin.left, width - margin.right])
    .padding(0.1)

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d[1])])
    .nice()
    .range([height - margin.bottom, margin.top])

  const bar = svg
    .append('g')
    .attr('fill', 'steelblue')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .style('mix-blend-mode', 'multiply')
    .attr('x', ([X, Y]) => x(X))
    .attr('y', ([X, Y]) => y(Y))
    .attr('height', d => y(0) - y(d[1]))
    .attr('width', x.bandwidth())

  const xAxis = g => g.attr('transform', `translate(0, ${height - 0})`).call(d3.axisBottom(x).tickSizeOuter(0))

  const yAxis = g =>
    g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select('.domain').remove())

  const gx = svg.append('g').call(xAxis)

  const gy = svg.append('g').call(yAxis)

  const obj = Object.assign(svg.node(), {
    update(order) {
      x.domain(data.sort(order).map(R.head))

      const t = svg.transition().duration(750)

      bar
        .data(data, R.head)
        .order()
        .transition(t)
        .delay((d, i) => i * 20)
        .attr('x', d => x(d.name))

      gx.transition(t)
        .call(xAxis)
        .selectAll('.tick')
        .delay((d, i) => i * 20)
    },
  })

  console.log('obj', obj)

  return () => obj
}

const defaultMargin = { top: 0, bottom: 0, left: 0, right: 0 }
const defaultWidth = 800
const defaultHeight = 600

SimpleChart.defaultProps = {
  margin: defaultMargin,
  width: defaultWidth,
  height: defaultHeight,
}
