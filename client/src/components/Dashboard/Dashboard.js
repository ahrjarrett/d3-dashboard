import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Overview } from './Overview'
import { StationList } from './StationList'
import { useFetch } from '../../hooks'
import { STATICDIR, SERVER_URL } from '../../config'
import { DashboardLoader } from '../loaders'
import * as S from '../../styled'
import Papa from 'papaparse'

export function Dashboard() {
  const params = useParams()
  const { pending, data, error } = useFetch(`${STATICDIR}station/${params.stationId}.json`, 'OVERVIEW', {
    resonseType: 'stream',
  })
  const stationMap = useFetch(`${STATICDIR}stationMap.json`, 'STATIONMAP', { resonseType: 'stream' })

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
