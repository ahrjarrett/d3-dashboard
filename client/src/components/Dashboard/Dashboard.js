import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Overview } from './Overview'
import { StationList } from './StationList'
import { useFetch } from '../../hooks'
import { STATICDIR, SERVER_URL } from '../../config'
import { DashboardLoader } from '../loaders'
import * as S from '../../styled'
import Papa from 'papaparse'

export function Dashboard() {
  const { stationId } = useParams()
  const [{ pending, data, error }, dispatch, refetch] = useFetch(`${STATICDIR}station/${stationId}.json`, 'OVERVIEW', {
    resonseType: 'stream',
  })

  // TODO: Add some client-side caching to make sure we don't refetch data unless the cache has been invalidated
  useEffect(() => {
    refetch()
  }, [stationId /* refetch */])

  const stationMap = useFetch(`${STATICDIR}stationMap.json`, 'STATIONMAP', { resonseType: 'stream' })

  console.log('stationMap', stationMap)

  return pending ? (
    <DashboardLoader />
  ) : !data ? null : (
    <S.Container>
      <div>Dashboard</div>
      <StationList stationMap={stationMap.data} />
      <Overview data={data} />
      <svg />
    </S.Container>
  )
}
