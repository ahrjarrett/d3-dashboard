import React from 'react'
import { Link } from 'react-router-dom'

import { STATION_MAP_URL } from '../../config'

const StationLink = ({ station }) => (
  <Link>
    <a href='#'>{station}</a>
  </Link>
)

export const StationList = () => {
  const { loading, error, data } = useFetch(STATION_MAP_URL)
  return loading ? (
    <h3>Fetching Station List...</h3>
  ) : (
      <ul>
        Station List
        {data.map(station => (
          <StationLink station={station} />
        ))}
      </ul>
    )
}
