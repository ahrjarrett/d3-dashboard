import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as d3 from 'd3'

import { Overview } from './Overview'
import { StationList } from './StationList'
import { useFetch } from '../../hooks'
import { STATICDIR, SERVER_URL } from '../../config'
import { Station } from '../../types'
import { DashboardLoader } from '../loaders'
import * as S from '../../styled'
import * as R from 'ramda'

export function Dashboard() {
  const { stationId } = useParams()
  const [{ pending, data, error }, dispatch, refetch] = useFetch(`${STATICDIR}station/${stationId}.json`, 'OVERVIEW', {
    resonseType: 'stream',
  })
  const stationMap = R.map(value => ({ [value]: [value.toString()] }))(Station)

  useEffect(() => {
    refetch()
  }, [stationId /* refetch */])

  return pending ? (
    <DashboardLoader />
  ) : !data ? null : (
    <S.Container>
      <div>Dashboard</div>
      <StationList stationMap={stationMap.data} />
      <Overview data={data} />
    </S.Container>
  )
}
