import React from 'react'
import { Link } from 'react-router-dom'
import * as S from './styled'

import { Station } from '../../types'

const StationLink = ({ station }) => (
  <Link to={`/dashboard/${station}`}>
    <span>{station}</span>
  </Link>
)

export const StationList = ({ stationMap }) => {
  const stations = Object.keys(stationMap || Station)

  return (
    <S.StationLink>
      <p>Stations</p>
      <>
        {stations.map(station => (
          <StationLink key={station} station={station} />
        ))}
      </>
    </S.StationLink>
  )
}
