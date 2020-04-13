import React, { useEffect } from 'react'

import { Overview } from './Overview'
import { useFetch } from '../../hooks'
import { DATA_URL } from '../../config'
import { DashboardLoader } from '../loaders'
import * as S from '../../styled'

export function Dashboard() {
  const { pending, data, error } = useFetch(DATA_URL)
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
