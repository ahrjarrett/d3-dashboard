export const APP_NAME = process.env.REACT_APP_APP_NAME
export const APP_HOST = process.env.REACT_APP_APP_HOST
export const NODE_ENV = process.env.NODE_ENV

export const SERVER_URL = `http://localhost:1337`
const STATIC_DATA = `static`

const OVERVIEW = `data.json`
const STATION_MAP = `stationMap.json`

export const STATICDIR = `${SERVER_URL}/${STATIC_DATA}/`
export const OVERVIEW_URL = `${STATICDIR}${OVERVIEW}`
export const STATION_MAP_URL = `${STATICDIR}${STATION_MAP}`
