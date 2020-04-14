import React from 'react'
import { Link } from 'react-router-dom'

import { Station } from '../../types'

const StationLink = ({ station }) => (
  <Link to={`/dashboard/${station}`}>
    <a>{station}</a>
  </Link>
)

export const StationList = ({ stationMap }) => {
  React.useEffect(() => {
    console.log('re-rendering StationList')

    console.log('stationMap', stationMap)
  })

  const stations = Object.keys(stationMap || Station)

  return (
    <ul>
      {stations.map(station => (
        <StationLink key={station} station={station} />
      ))}
    </ul>
  )
}
