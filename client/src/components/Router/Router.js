import React, { Suspense } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import moment from 'moment'

import App from '../App'
import ErrorBoundary from '../ErrorBoundary'
import { renderLoader } from './renderLoader'
import { Tier, Station } from '../../types'

const renderEnv = match => {
  return <h2>Environment: {match.params.env}</h2>
}

const RedirectToSelectStation = () => {
  return <Redirect to='/dashboard/HGTV' />
}

export default function Router() {
  return (
    <ErrorBoundary name='RouterErrorBoundary'>
      <Suspense fallback={renderLoader()}>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/dashboard'>
          <RedirectToSelectStation />
        </Route>
        <Route path='/dashboard/:stationId'>
          <App />
        </Route>
        <Route path='/__/:env' render={({ match }) => renderEnv(match)} />
      </Suspense>
    </ErrorBoundary>
  )
}

const d = {
  weekof: '2019-10-28',
  broadcast_weekof: '2019-10-28',
  date_aired: '2019-11-01',
  time_aired: '2:08:00',
  date_time_aired: '2019-11-01 2:08',
  station_code: 'RCNOV',
  station_name: 'RCN Novelas',
  bc_day: 'Thursday',
  length: '30',
  program_aired: '',
  dp_aired: 'OV',
  day_part_aired: 'OVERNIGHT',
  spent: '0',
  imp: '3',
  tier: 'HISP',
  web_visits: '0.89',
  sales: '0.02',
  leads: '0.04',
  last_update_date: '2020-02-19 12:02',
}

const model = {
  from: d,
  to: {
    dateTime: moment(d.date_aired).valueOf(), // Int
    last_update_date: moment(d.last_update_date).valueOf(), // Int
    day_part_aired: 'OVERNIGHT', // DayPart<String>

    station_id: Station[d.station_code], // StationId<String>
    program: '', // Program<String>
    tier: Tier[d.tier], // Tier<Int>

    duration: parseInt('30', 10), // SlotDuration<Int>
    spent: parseFloat('0', 10),
    imp: parseFloat('3', 10),
    web_visits: parseFloat('0.89', 10),
    sales: parseFloat('0.02', 10),
    leads: parseFloat('0.04', 10),

    /***  TODO: Remove later ***/
    station_name: 'RCN Novelas', // StationName<String>
    broadcast_weekof: moment(d.broadcast_weekof).isoWeek(), // Int
  },
}

function Model() {
  return <pre>{JSON.stringify(model, null, 2)}</pre>
}

function Home() {
  return (
    <>
      <Link to='/dashboard'>
        <a href=''>Log in</a>
      </Link>
      <Model />
    </>
  )
}
