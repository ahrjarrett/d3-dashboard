import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Overview } from './Overview'
import { StationList } from './StationList'
import { useFetch } from '../../hooks'
import { SERVER_URL } from '../../config'
import { DashboardLoader } from '../loaders'
import * as S from '../../styled'
import Papa from 'papaparse'

export function Dashboard() {
  const params = useParams()
  const { pending, data, error } = useFetch(`${SERVER_URL}/byStation/${params.stationId}`, { resonseType: 'stream' })
  const otherFetchState = useFetch(`http://localhost:1337/api/data/${params.stationId}`)
  console.log('params', params)

  return pending ? (
    <DashboardLoader />
  ) : !data ? null : (
    <S.Container>
      <div>Dashboard</div>
      <StationList />
      <div>
        <Overview data={data} />
      </div>
      <svg />
    </S.Container>
  )
}
