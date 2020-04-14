import moment, { locale } from 'moment'
import * as R from 'ramda'

export const spreadListIntoMap = R.reduce(R.merge, {})

export const getDateFromWeekNumber = (isoWeek, year = 2020) => {
  return d =>
    moment()
      .day('Sunday')
      .year(year)
      .week(isoWeek)
      .toDate()
}
