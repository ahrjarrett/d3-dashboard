import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Overview } from './Overview'
import { useFetch } from '../../hooks'
import { DATA_URL } from '../../config'
import { DashboardLoader } from '../loaders'
import * as S from '../../styled'
import Papa from 'papaparse'

export function Dashboard() {
  const { pending, data, error } = useFetch(DATA_URL, { resonseType: 'stream' })
  const params = useParams()
  console.log('params', params)

  useEffect(() => {
    if (data) {
      const parsed = data
    }
  }, [data])

  return pending ? (
    <DashboardLoader />
  ) : !data ? null : (
    <S.Container>
      <div>Dashboard</div>
      <div>
        <Overview data={data} />
      </div>
    </S.Container>
  )
}
