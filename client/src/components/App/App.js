import React, { useEffect, useLayoutEffect, useState } from 'react'
import moment from 'moment'

import { Dashboard } from '../Dashboard'
import { APP_NAME, DATA_URL } from '../../config'
import * as S from './styled'

export default function App() {
  useEffect(() => {
    window.moment = moment
  }, [])

  return (
    <S.Outermost>
      <S.Container>
        <S.Title>{APP_NAME}</S.Title>
        <Dashboard />
      </S.Container>
    </S.Outermost>
  )
}
