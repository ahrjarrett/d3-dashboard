import React from 'react'
import { Link } from 'react-router-dom'

const StationLink = ({ station }) => (
  <Link to='/dashboard/${station}'>
    <a href='#'>{station}</a>
  </Link>
)

export const StationList = ({ stationMap }) => {
  return !stationMap ? null : (
    <ul>
      {Object.keys(stationMap).map(station => (
        <StationLink key={station} station={station} />
      ))}
    </ul>
  )
}
