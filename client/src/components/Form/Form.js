import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import * as types from '../store/types'
import * as hooks from '../hooks'
import * as S from './styled'

export default function Form({ autofocus }) {
  const dispatch = useDispatch()

  hooks.useFocus()

  const handleClick = useCallback(
    e => {
      e.preventDefault()
      dispatch({ type: types.TOGGLE_FOCUS, payload: autofocus })
    },
    [autofocus, dispatch],
  )

  useEffect(() => {
    dispatch({ type: types.TOGGLE_FOCUS, payload: autofocus })
  }, [autofocus, dispatch])

  return (
    <S.Form>
      <input id={autofocus} placeholder='I focus' />
      <S.Button onClick={handleClick}>Click me to focus input</S.Button>
    </S.Form>
  )
}
