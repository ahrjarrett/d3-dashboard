import React from 'react'
import { Link } from 'react-router-dom'

const StationLink = ({ station }) => (
  <Link>
    <a href='#'>{station}</a>
  </Link>
)

export const StationList = ({ stationMap }) => {
  return (
    <ul>
      {stationMap.map(station => (
        <StationLink station={station} />
      ))}
    </ul>
  )
}
