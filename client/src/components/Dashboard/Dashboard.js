import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {Overview} from './Overview'
import {StationList} from './StationList'
import {useFetch} from '../../hooks'
import {STATICDIR, SERVER_URL} from '../../config'
import {DashboardLoader} from '../loaders'
import * as S from '../../styled'
import Papa from 'papaparse'

export function Dashboard() {
  const params = useParams()
  const {pending, data, error} = useFetch(`${STATICDIR}station/${params.stationId}.json`, {resonseType: 'stream'})
  const stationMap = useFetch(`${STATICDIR}station/${params.stationId}.json`, {resonseType: 'stream'})

  return pending ? (
    <DashboardLoader />
  ) : !data ? null : (
    <S.Container>
      <div>Dashboard</div>
      <StationList stationMap={stationMap.data} />
      <div>
        <Overview data={data} />
      </div>
      <svg />
    </S.Container>
  )
}
