import * as R from 'ramda'

export const spreadListIntoMap = R.reduce(R.merge, {})
