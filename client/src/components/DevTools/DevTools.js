import React, { lazy } from 'react'
import { includes, isEmpty } from 'lodash/fp'

import { APP_NAME, APP_HOST } from '../../config'

export default function DevTools({ children, ...props }) {
  //console.log(children, env, props);
  //if (isEmpty(env) || includes(["production", "staging"])) return;

  return children(...props)
}
