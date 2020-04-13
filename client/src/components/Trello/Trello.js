import React, { useCallback, useState } from 'react'
import { clone } from 'lodash/fp'

import * as hooks from '../../hooks'
import * as S from './styled'

function Column({ column, index, moveColumn }) {
  const { ref, opacity } = hooks.useDraggableColumn({
    index,
    id: index,
    column,
    moveColumn,
  })

  return (
    <S.Column opacity={opacity}>
      <div className='dropzone' id={index} ref={ref}>
        <S.Header color={column.color}>{column.header}</S.Header>
        <Cards data={column.cards} />
      </div>
    </S.Column>
  )
}

function Card({ index, id, card, moveCard }) {
  const { ref, opacity } = hooks.useDraggableCard({
    index,
    id,
    card,
    moveCard,
  })

  const keys = Object.keys(card).filter(k => typeof card[k] === 'string')
  return (
    <S.Card opacity={opacity}>
      <div ref={ref}>
        {keys.map(key => (
          <p key={card[key]}>
            {key}: {card[key]}
          </p>
        ))}
      </div>
    </S.Card>
  )
}

function Cards({ data }) {
  const [order, setOrder] = useState(() => data.map((_, i) => i))

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      let _new = clone(order)
        ;[_new[dragIndex], _new[hoverIndex]] = [_new[hoverIndex], _new[dragIndex]]
      setOrder(_new)
    },
    [order],
  )

  return (
    <S.Cards>
      {order.map((orderIndex, index) => (
        <Card
          index={index}
          id={'0' + index}
          card={data[orderIndex]}
          key={data[orderIndex].name}
          moveCard={moveCard}
          setOrder={setOrder}
        />
      ))}
    </S.Cards>
  )
}

function Columns({ data }) {
  const [order, setOrder] = useState(() => data.map((_, i) => i))

  const moveColumn = useCallback(
    (dragIndex, hoverIndex) => {
      let _new = clone(order)
        ;[_new[dragIndex], _new[hoverIndex]] = [_new[hoverIndex], _new[dragIndex]]
      setOrder(_new)
    },
    [order],
  )

  return (
    <S.Columns>
      {order.map((orderIndex, index) => (
        <Column
          index={index}
          column={data[orderIndex]}
          setOrder={setOrder}
          key={data[orderIndex].header}
          moveColumn={moveColumn}
        />
      ))}
    </S.Columns>
  )
}

export default function Trello({ data }) {
  return <Columns data={data} />
}
